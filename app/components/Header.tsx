import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ChevronDown, Code, Palette, Zap, Moon, Sun } from "lucide-react";

export default function Header() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const, // Explicitly type as 'spring'
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const roleIcons = [
    { icon: Code, label: "Web Developer", color: "from-blue-400 to-cyan-400" },
    {
      icon: Palette,
      label: "UI/UX Designer",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Zap,
      label: "Creative Technologist",
      color: "from-orange-400 to-yellow-400",
    },
  ];

  return (
    <motion.header
      style={{ opacity, scale }}
      className="relative min-h-screen overflow-hidden transition-all duration-700 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 text-white"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/30"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 dark:bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-24 flex items-center justify-center min-h-screen"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-4xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Michael Isih
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-blue-100 dark:text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Crafting Digital Experiences That Inspire and Transform the Future
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16"
          >
            {roleIcons.map((role, index) => (
              <motion.div
                key={role.label}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-4 sm:px-6 py-3 bg-white/10 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 border border-white/30 dark:border-white/20 backdrop-blur-lg rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="flex items-center gap-2 relative z-10">
                  <role.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="whitespace-nowrap">{role.label}</span>
                </div>
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 hover:from-blue-400 dark:hover:from-blue-500 hover:to-purple-400 dark:hover:to-purple-500 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 border border-white/40 dark:border-white/30 backdrop-blur-lg rounded-2xl font-semibold text-white transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              animate={{
                y: [0, -12, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.2 }}
              className="cursor-pointer"
              onClick={() =>
                window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </motion.header>
  );
}
