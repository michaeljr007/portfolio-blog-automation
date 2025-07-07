import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Mail,
  ChevronRight,
  Newspaper,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface NavProps {
  activeSection: string; // e.g., "home", "about", "portfolio", "contact", "blog"
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

export default function BlogNav({
  activeSection,
  setDarkMode,
  darkMode,
}: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants: Variants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  // Determine if a nav item is active
  const isActive = (label: string) => {
    return pathname === "/blog" ? label === "blog" : activeSection === label;
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60 top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl border-b border-gray-200 dark:border-gray-700"
            : "backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo/Brand */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Link href="/" className="flex items-center gap-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-500 dark:to-purple-600 flex items-center justify-center"
                >
                  <span className="text-white font-bold text-sm">MI</span>
                </motion.div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  Welcome
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              variants={itemVariants}
              className="hidden md:flex items-center space-x-1"
            >
              <motion.div className="relative">
                <Link
                  href="/"
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    isActive("home")
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                  {isActive("home") && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
              <motion.div className="relative">
                <Link
                  href="/"
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    isActive("about")
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>About</span>
                  {isActive("about") && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
              <motion.div className="relative">
                <Link
                  href="/"
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    isActive("portfolio")
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Portfolio</span>
                  {isActive("portfolio") && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
              <motion.div className="relative">
                <Link
                  href="/"
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    isActive("contact")
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                  {isActive("contact") && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
              <motion.div className="relative">
                <Link
                  href="/blog"
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    isActive("blog")
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Blog</span>
                  {isActive("blog") && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side Controls */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-yellow-400"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={darkMode ? "dark" : "light"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {darkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed top-20 right-4 z-50 w-80 rounded-2xl shadow-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="space-y-2">
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                        isActive("home")
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Home className="w-5 h-5" />
                        <span className="font-medium">Home</span>
                      </div>
                      <motion.div
                        animate={{ x: isActive("home") ? 0 : -10 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                      </motion.div>
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                        isActive("about")
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5" />
                        <span className="font-medium">About</span>
                      </div>
                      <motion.div
                        animate={{ x: isActive("about") ? 0 : -10 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                      </motion.div>
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                        isActive("portfolio")
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-5 h-5" />
                        <span className="font-medium">Portfolio</span>
                      </div>
                      <motion.div
                        animate={{ x: isActive("portfolio") ? 0 : -10 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                      </motion.div>
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                        isActive("contact")
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5" />
                        <span className="font-medium">Contact</span>
                      </div>
                      <motion.div
                        animate={{ x: isActive("contact") ? 0 : -10 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                      </motion.div>
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      href="/blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                        isActive("blog")
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Newspaper className="w-5 h-5" />
                        <span className="font-medium">Blog</span>
                      </div>
                      <motion.div
                        animate={{ x: isActive("blog") ? 0 : -10 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
