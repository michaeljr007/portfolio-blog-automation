const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

function formatMarkdown(markdown) {
  return (
    markdown
      // Ensure blank lines after headings
      .replace(/^(#{1,6} .+)/gm, "\n$1\n")
      // Ensure blank lines before and after lists
      .replace(/(\n)?(^[*\-+] .+)/gm, "\n$2")
      .replace(/(^[*\-+] .+\n)(?![*\-+])/gm, "$1\n")
      // Ensure blank lines between paragraphs
      .replace(/([^\n])\n([^\n])/g, "$1\n\n$2")
      // Remove multiple blank lines
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

async function generatePost() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
  Write a blog post that feels like a cozy chat over coffee. The tone should be warm, relatable, lightly witty, and peppered with small humorous observations that make the reader smile. 
The topic should be a trending topic in the United States. It should have a catchy click-baity title, and not less than 1500 words.
Return only a raw JSON object with the following structure. DO NOT wrap in markdown:

{
  "title": "",
  "summary": "A brief summary suitable for SEO meta description.",
  "content": "The full blog post content in markdown format, including headings, lists, and paragraphs.",
  "image": "random image",
  "category": ""
}

`;

  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents,
      config: {
        responseMimeType: "text/plain",
      },
    });

    // Stream and combine the response text
    let rawResponse = "";
    for await (const chunk of response) {
      rawResponse += chunk.text || "";
    }

    let cleanResponse = rawResponse.trim();

    // Try to extract JSON inside ```json ... ```
    const jsonMatch = cleanResponse.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      cleanResponse = jsonMatch[1].trim();
    }

    let postData;
    try {
      postData = JSON.parse(cleanResponse);
    } catch (e) {
      throw new Error(
        "Failed to parse Gemini 2.0 response as JSON.\nPartial response:\n" +
          rawResponse.slice(0, 500) +
          (rawResponse.length > 500 ? "...(truncated)" : "")
      );
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

    const postsDir = path.join(process.cwd(), "posts");
    if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);

    const filePath = path.join(postsDir, `${slug}.md`);
    fs.writeFileSync(filePath, mdContent);

    console.log(`✅ New post generated: ${filePath}`);
  } catch (err) {
    console.error("❌ Error generating post:", err);
  }
}

generatePost();
