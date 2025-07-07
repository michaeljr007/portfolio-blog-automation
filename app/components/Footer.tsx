import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Heart,
  ArrowUp,
  Mail,
  Code,
  Coffee,
  Sparkles,
} from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "#",
      color: "hover:text-white hover:bg-gray-800",
      hoverColor: "group-hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "hover:text-white hover:bg-blue-600",
      hoverColor: "group-hover:text-blue-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
      color: "hover:text-white hover:bg-blue-500",
      hoverColor: "group-hover:text-blue-400",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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

  const floatingAnimation: any = {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <footer
      className={`relative overflow-hidden ${
        darkMode
          ? "bg-gradient-to-t from-gray-900 via-dark-surface to-dark-elevated border-t border-gray-800/50"
          : "bg-gradient-to-t from-gray-50 via-white to-gray-100 border-t border-gray-200/50"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-4 right-8 w-32 h-32 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [2, -2, 2],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute bottom-4 left-8 w-24 h-24 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-2xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Top section with branding */}
          <motion.div
            variants={itemVariants}
            className="py-12 border-b border-gray-200/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <motion.h3
                  className={`text-2xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Michael Isih
                  </span>
                </motion.h3>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                  <Code className="w-4 h-4 text-blue-500" />
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    Full Stack Developer
                  </span>
                </div>
              </div>

              {/* Quick contact */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <motion.a
                  href="mailto:michaelisih.dev@gmail.com"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                    darkMode
                      ? "bg-dark-elevated/50 border-gray-700 text-gray-300 hover:bg-blue-500/20 hover:border-blue-500/50"
                      : "bg-white/80 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Get in touch</span>
                  <span className="text-sm font-medium">
                    michaelisih.dev@gmail.com
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Main footer content */}
          <div className="py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              {/* Copyright and status */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
              >
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    © {new Date().getFullYear()} Michael Isih. All rights
                    reserved.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    Available for work
                  </span>
                </div>
              </motion.div>

              {/* Links and social */}
              <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-8">
                {/* Navigation links */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap justify-center gap-6"
                >
                  {["Privacy Policy", "Terms of Service", "Credits"].map(
                    (link, index) => (
                      <motion.a
                        key={link}
                        href="#"
                        whileHover={{ y: -2 }}
                        className={`text-sm transition-all duration-300 ${
                          darkMode
                            ? "text-gray-400 hover:text-blue-400"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        {link}
                      </motion.a>
                    )
                  )}
                </motion.div>

                {/* Social links */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className={`group relative p-3 rounded-xl transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/80"
                          : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80"
                      } ${social.color}`}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <social.icon className="w-5 h-5 transition-colors duration-300" />

                      {/* Tooltip */}
                      <motion.div
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        {social.name}
                      </motion.div>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <motion.div
            variants={itemVariants}
            className="py-6 border-t border-gray-200/10"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Made with love */}
              <div className="flex items-center gap-2 text-sm">
                <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  Made with
                </span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  and
                </span>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Coffee className="w-4 h-4 text-amber-600" />
                </motion.div>
              </div>

              {/* Back to top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/80 hover:text-white"
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
                }`}
              >
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm font-medium">Back to top</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative sparkles */}
      <div className="absolute top-8 left-1/4">
        <motion.div
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-4 h-4 text-blue-400/30" />
        </motion.div>
      </div>

      <div className="absolute bottom-16 right-1/3">
        <motion.div
          animate={{
            scale: [0, 1, 0],
            rotate: [360, 180, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Sparkles className="w-3 h-3 text-purple-400/30" />
        </motion.div>
      </div>
    </footer>
  );
}
