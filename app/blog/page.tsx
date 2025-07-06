import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogHome from "./BlogHome";

export function generateMetadata() {
  return {
    title: "Blog | Michael's Portfolio",
    description: "Read articles on web development, AI, sports and more.",
    openGraph: {
      title: "Blog | Michael's Portfolio",
      description: "Read articles on web development, AI, sports and more.",
      type: "website",
      images: [
        {
          url: "https://yourdomain.com/images/default-og.jpg",
          width: 1200,
          height: 630,
          alt: "Blog preview",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: "Blog | Michael's Portfolio",
      description: "Read articles on web development, AI, sports and more.",
      images: ["https://yourdomain.com/images/default-og.jpg"],
    },
  };
}

export default function Blog() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);

  const posts = files.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, "");
    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date) : new Date(0), // fallback to old date
      category: data.category,
      image: data.image,
    };
  });

  // sort by date descending (newest first)
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return <BlogHome posts={posts} />;
}
