const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");
const googleTrends = require("google-trends-api");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

function formatMarkdown(markdown) {
  return markdown
    .replace(/^(#{1,6} .+)/gm, "\n$1\n")
    .replace(/(\n)?(^[*\-+] .+)/gm, "\n$2")
    .replace(/(^[*\-+] .+\n)(?![*\-+])/gm, "$1\n")
    .replace(/([^\n])\n([^\n])/g, "$1\n\n$2")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function getGoogleTrends() {
  try {
    const res = await googleTrends.dailyTrends({ geo: "US" });
    const data = JSON.parse(res);
    const trends = data.default.trendingSearchesDays[0].trendingSearches;
    return trends.map((t) => t.title.query);
  } catch (err) {
    console.error("❌ Google Trends error:", err);
    return [];
  }
}

async function getRedditHot(subreddit = "technology") {
  try {
    const res = await axios.get(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=15`
    );
    return res.data.data.children.map((p) => p.data.title);
  } catch (err) {
    console.error("❌ Reddit fetch error:", err);
    return [];
  }
}

async function generatePosts() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    throw new Error("Missing GEMINI_API_KEY in environment variables");
  const ai = new GoogleGenAI({ apiKey });

  const [googleTopics, redditTopics] = await Promise.all([
    getGoogleTrends(),
    getRedditHot("technology"),
  ]);

  const allTopics = [...new Set([...googleTopics, ...redditTopics])];
  console.log("📰 Total combined topics:", allTopics.length);

  if (allTopics.length < 5)
    throw new Error(
      "Not enough topics fetched to even try generating 5 posts."
    );

  const postsDir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);

  let generatedCount = 0;
  let attempts = 0;

  for (const topic of allTopics) {
    if (generatedCount >= 5) break; // Stop once we have 5 good posts
    attempts++;

    console.log(`✍️ Generating post for topic #${attempts}: "${topic}"`);

    const prompt = `
Write a blog post that feels like a cozy chat over coffee. The tone should be warm, relatable, lightly witty, and peppered with small humorous observations that make the reader smile.
The topic is: "${topic}". It should have a catchy click-baity title, and be at least 1500 words.
Return only a raw JSON object with the following structure. DO NOT wrap in markdown:

{
  "title": "",
  "summary": "A brief summary suitable for SEO meta description.",
  "content": "The full blog post content in markdown format, including headings, lists, and paragraphs.",
  "image": "random image",
  "category": ""
}
`;

    try {
      const response = await ai.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { responseMimeType: "text/plain" },
      });

      let rawResponse = "";
      for await (const chunk of response) {
        rawResponse += chunk.text || "";
      }

      let cleanResponse = rawResponse.trim();
      const jsonMatch =
        cleanResponse.match(/```json\s*([\s\S]*?)\s*```/) ||
        cleanResponse.match(/{[\s\S]*}/);
      if (jsonMatch) cleanResponse = jsonMatch[1] || jsonMatch[0];

      let postData;
      try {
        postData = JSON.parse(cleanResponse);
      } catch (e) {
        console.warn(`⚠️ Strict JSON.parse failed, trying fallback eval...`);
        try {
          postData = Function('"use strict";return (' + cleanResponse + ")")();
        } catch (ee) {
          console.error(`❌ Failed to parse JSON for "${topic}". Skipping...`);
          continue;
        }
      }

      if (!postData.content || postData.content.length < 1000) {
        console.log(`⏭️ Skipping "${topic}" - content too short.`);
        continue;
      }

      const slug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const date = new Date().toISOString().split("T")[0];

      const mdContent = `---
title: "${postData.title.replace(/"/g, '\\"')}"
summary: "${postData.summary.replace(/"/g, '\\"')}"
date: "${date}"
image: "${postData.image}"
category: "${postData.category}"
---

${formatMarkdown(postData.content)}
`;

      const filePath = path.join(postsDir, `${slug}.md`);
      fs.writeFileSync(filePath, mdContent);
      generatedCount++;
      console.log(`✅ Post #${generatedCount} created: ${filePath}`);
    } catch (err) {
      console.error(`❌ Error generating post for "${topic}":`, err);
    }
  }

  console.log(
    `🎉 Finished! Created ${generatedCount} posts out of ${attempts} attempts.`
  );
}

generatePosts();
