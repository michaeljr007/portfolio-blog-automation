// app/posts/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import PostContent from "./PostContent";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));
  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    title: data.title,
    description: data.summary,
  };
}

export default async function Post({ params }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const filePath = path.join(process.cwd(), "posts", `${decodedSlug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <PostContent
      date={data.date}
      title={data.title}
      contentHtml={contentHtml}
      image={data.image}
    />
  );
}
