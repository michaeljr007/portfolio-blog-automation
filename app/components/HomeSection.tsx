import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Code,
  Palette,
  Zap,
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

interface HomeSectionProps {
  darkMode: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const floatingVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const sparkleVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HomeSection({ darkMode }: HomeSectionProps) {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const skills = [
    { icon: Code, label: "Development", color: "from-blue-500 to-cyan-500" },
    { icon: Palette, label: "Design", color: "from-purple-500 to-pink-500" },
    { icon: Zap, label: "Innovation", color: "from-orange-500 to-yellow-500" },
  ];

  return (
    <section
      id="home"
      className={`relative min-h-screen py-20 overflow-hidden ${
        darkMode
          ? "dark:bg-dark-surface"
          : "bg-gradient-to-br from-gray-50 to-white"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Shapes */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={`absolute top-20 right-20 w-64 h-64 rounded-full opacity-10 ${
            darkMode
              ? "bg-gradient-to-br from-blue-500 to-purple-500"
              : "bg-gradient-to-br from-blue-400 to-purple-400"
          } blur-3xl`}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className={`absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-10 ${
            darkMode
              ? "bg-gradient-to-br from-pink-500 to-orange-500"
              : "bg-gradient-to-br from-pink-400 to-orange-400"
          } blur-3xl`}
        />

        {/* Floating Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            variants={sparkleVariants}
            animate="animate"
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            transition={{ delay: i * 0.5 }}
          >
            <Sparkles
              className={`w-4 h-4 ${
                darkMode ? "text-blue-400" : "text-blue-500"
              } opacity-30`}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto flex flex-col items-center justify-center min-h-screen"
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 ${
              darkMode
                ? "bg-gray-800/50 dark:bg-dark-elevated/50 border-gray-700 text-green-400"
                : "bg-green-50 border-green-200 text-green-600"
            } backdrop-blur-sm`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">
              Available for new projects
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-bold mb-8 leading-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to My{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Digital Universe
              </span>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl mb-12 max-w-3xl leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            I transform ideas into beautiful, functional digital experiences
            that captivate users and drive results. Let's build something
            amazing together.
          </motion.p>

          {/* Skills Icons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.label}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`group relative p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/30 dark:bg-dark-elevated/30 border-gray-700 hover:border-gray-600"
                    : "bg-white/70 border-gray-200 hover:border-gray-300"
                } hover:shadow-lg`}
              >
                <div className="flex flex-col items-center gap-2 w-24">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} shadow-lg`}
                  >
                    <skill.icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {skill.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12"
          >
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("portfolio");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group px-8 py-4 border-2 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              } backdrop-blur-sm`}
            >
              <Mail className="w-5 h-5" />
              <span>Contact Me</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group px-8 py-4 border-2 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              } backdrop-blur-sm`}
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/50 dark:bg-dark-elevated/50 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700"
                    : "bg-white/70 hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200"
                } backdrop-blur-sm shadow-lg hover:shadow-xl`}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-6 h-10 border-2 rounded-full flex justify-center ${
                darkMode ? "border-gray-600" : "border-gray-400"
              }`}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-1 h-3 rounded-full mt-2 ${
                  darkMode ? "bg-gray-500" : "bg-gray-500"
                }`}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
