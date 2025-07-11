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
    console.error("❌ Google Trends error:", err.message);
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
    console.error("❌ Reddit fetch error:", err.message);
    return [];
  }
}

async function retry(fn, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`🔁 Retry ${i + 1}/${retries} failed: ${err.message}`);
      await new Promise((res) => setTimeout(res, delay * (i + 1)));
    }
  }
  throw new Error("All retries failed.");
}

async function generatePosts() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    throw new Error("Missing GEMINI_API_KEY in environment variables");
  const ai = new GoogleGenAI({ apiKey });

  // fetch topics
  const [googleTopics, redditTopics] = await Promise.all([
    getGoogleTrends(),
    getRedditHot("technology"),
  ]);

  const allTopics = [...new Set([...googleTopics, ...redditTopics])];
  console.log("📰 Total combined topics:", allTopics.length);

  const postsDir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);

  let generatedCount = 0;
  let attempts = 0;
  let index = 0;

  while (generatedCount < 5 && attempts < 20 && index < allTopics.length) {
    const topic = allTopics[index++];
    attempts++;
    console.log(`✍️ Attempt #${attempts} on topic: "${topic}"`);

    try {
      await retry(
        async () => {
          const prompt = `
Write a blog post that feels like a cozy chat over coffee. The tone should be warm, relatable, lightly witty, and peppered with small humorous observations that make the reader smile.
The topic is: "${topic}". It should have a catchy click-baity title, and be at least 1100 words.
Return only a raw JSON object with the following structure. DO NOT wrap in markdown:

{
  "title": "",
  "summary": "A brief summary suitable for SEO meta description.",
  "content": "The full blog post content in markdown format, including headings, lists, and paragraphs.",
  "image": "randomimg",
  "category": ""
}
`;

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
          } catch (err) {
            console.warn("⚠️ JSON.parse failed, trying fallback eval...");
            try {
              postData = Function(
                '"use strict";return (' + cleanResponse + ")"
              )();
            } catch (err2) {
              console.error("❌ Failed parsing JSON. Dumping output snippet:");
              console.error(cleanResponse.slice(0, 500));
              throw new Error("JSON parsing failed");
            }
          }

          if (!postData.content || postData.content.length < 1000) {
            console.log(`⏭️ Skipping "${topic}" - content too short.`);
            return;
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
          console.log(`✅ Created Post #${generatedCount}: ${filePath}`);
        },
        3,
        2000
      );
    } catch (err) {
      console.error(`❌ Failed attempt for "${topic}":`, err.message);
    }
  }

  console.log(
    `🎉 Done! Generated ${generatedCount} posts out of ${attempts} attempts.`
  );
}

generatePosts();
