"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  Clock,
  Calendar,
  User,
  Share2,
  BookOpen,
  ArrowUp,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import BlogNav from "@/components/BlogNavbar";
import Head from "next/head";

export default function PostContent({
  title,
  contentHtml,
  author = "Michael Isih",
  date,
  image,
  readTime = "5 min read",
  description,
  slug,
}) {
  const [activeSection, setActiveSection] = useState("blog");
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    // First script
    (function (d, z, s) {
      s.src = "https://" + d + "/401/" + z;
      try {
        (document.body || document.documentElement).appendChild(s);
      } catch (e) {}
    })("gizokraijaw.net", 9540235, document.createElement("script"));

    // Second script
    (function (d, z, s) {
      s.src = "https://" + d + "/400/" + z;
      try {
        (document.body || document.documentElement).appendChild(s);
      } catch (e) {}
    })("vemtoutcheeg.com", 9540263, document.createElement("script"));
  }, []);

  return (
    <>
      <Head>
        <title>{title} | Ancestor Group</title>
        <meta
          name="description"
          content={description || "Read this article."}
        />
        <link
          rel="canonical"
          href={`https://ancestor-group.com.ng/blog/${slug}`}
        />
        {/* Social sharing */}
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description || "Read this article."}
        />
        <meta
          property="og:url"
          content={`https://ancestor-group.com.ng/blog/${slug}`}
        />
      </Head>
      <BlogNav
        darkMode={darkMode}
        activeSection={activeSection}
        setDarkMode={setDarkMode}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{ width: `${scrollProgress}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      <main className="min-h-screen pt-[11%] md:pt-[4%] bg-white dark:bg-dark-surface transition-colors duration-300">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div className="mb-12 sm:mb-16" variants={itemVariants}>
            <motion.h1
              className="text-xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              className="flex flex-wrap items-center gap-y-2 gap-x-3 md:gap-y-6 md:gap-x-6 text-gray-600 dark:text-gray-300 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>Article</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 md:gap-4 text-sm md:text-base"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full border transition-all duration-200 ${
                  liked
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white dark:bg-dark-elevated border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-red-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                <span>{liked ? "Liked" : "Like"}</span>
              </motion.button>

              <motion.button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                  bookmarked
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white dark:bg-dark-elevated border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bookmark
                  className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
                />
                <span>{bookmarked ? "Saved" : "Save"}</span>
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-elevated text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-500 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </motion.button>

              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-elevated text-gray-700 dark:text-gray-300 hover:border-purple-500 hover:text-purple-500 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.article
            className="prose prose-lg dark:prose-invert max-w-none"
            variants={itemVariants}
          >
            <motion.div
              className="bg-white dark:bg-dark-elevated dark:text-white rounded-2xl p-6 sm:p-12 shadow-sm border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src={image}
                alt="Thinking man with question mark"
                className="w-[94%] md:w-[60%] mx-auto mb-10 rounded-lg"
              />

              <div
                className="prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose dark:prose-invert prose-lg space-y-4"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </motion.div>
          </motion.article>

          {/* Footer Actions */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-center sm:text-left">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enjoyed this article? Share it with others!
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  onClick={handleShare}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Share Article
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </>
  );
}
