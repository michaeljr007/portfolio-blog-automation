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

interface NavProps {
  activeSection: string;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

export default function Nav({
  activeSection,
  setDarkMode,
  darkMode,
}: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: User },
    { href: "#portfolio", label: "Portfolio", icon: Briefcase },
    { href: "#contact", label: "Contact", icon: Mail },
    { href: "/blog", label: "Blog", icon: Newspaper },
  ];

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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-500 dark:to-purple-600 flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">MI</span>
              </motion.div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Welcome
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              variants={itemVariants}
              className="hidden md:flex items-center space-x-1"
            >
              {navItems.map((item) => (
                <motion.div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                      activeSection === item.href.slice(1)
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 dark:text-white rounded-lg font-medium hover:from-blue-600 text-gray-800 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                        : " text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span
                      className={`${item.label === "Blog" && "text-white"}`}
                    >
                      {item.label}
                    </span>
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Side Controls */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="relative p-3 rounded-xl transition-all duration-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-yellow-400 shadow-lg hover:shadow-xl"
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

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-xl transition-all duration-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-lg hover:shadow-xl"
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed top-20 right-4 z-50 w-80 rounded-2xl shadow-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={mobileItemVariants}
                      custom={index}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          if (item.href.startsWith("#")) {
                            e.preventDefault();
                            const id = item.href.replace("#", "");
                            const el = document.getElementById(id);
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth" });
                            }
                            setIsMobileMenuOpen(false);
                          } else if (item.href === "/blog") {
                            // Let default navigation handle the blog link
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                          activeSection === item.href.slice(1)
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <motion.div
                          animate={{
                            x: activeSection === item.href.slice(1) ? 0 : -10,
                          }}
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
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
