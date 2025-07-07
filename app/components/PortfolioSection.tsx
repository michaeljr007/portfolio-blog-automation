import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Smartphone,
  Monitor,
  Palette,
  Code,
  ExternalLink,
  Eye,
  Github,
  ArrowUpRight,
  Layers,
  Zap,
  Star,
  Calendar,
  Play,
} from "lucide-react";
import Link from "next/link";

interface PortfolioSectionProps {
  filter: "all" | "app" | "product" | "branding";
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "app" | "product" | "branding">
  >;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  darkMode: boolean;
  filteredItems: any[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1],
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

const filterButtonVariants: Variants = {
  inactive: { scale: 1 },
  active: { scale: 1.05 },
  hover: { scale: 1.02, y: -1 },
  tap: { scale: 0.98 },
};

export default function PortfolioSection({
  filter,
  setFilter,
  filteredItems,
  setSelectedImage,
  darkMode,
}: PortfolioSectionProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "app":
        return <Smartphone className="w-4 h-4" />;
      case "product":
        return <Monitor className="w-4 h-4" />;
      case "branding":
        return <Palette className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "app":
        return "from-blue-500 to-cyan-500";
      case "product":
        return "from-purple-500 to-pink-500";
      case "branding":
        return "from-orange-500 to-red-500";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

  const filterCategories = [
    { key: "all", label: "All Projects", icon: Layers },
    { key: "product", label: "Web Products", icon: Monitor },
    { key: "branding", label: "Branding", icon: Palette },
  ];

  return (
    <section
      id="portfolio"
      className={`py-20 lg:py-32 relative overflow-hidden ${
        darkMode ? "dark:bg-dark-surface" : "bg-gray-50"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">
                Portfolio
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Explore my latest work spanning mobile applications, web products,
              and branding projects.
            </motion.p>
          </div>

          {/* Filter Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12 lg:mb-16"
          >
            {filterCategories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setFilter(category.key as typeof filter)}
                variants={filterButtonVariants}
                initial="inactive"
                animate={filter === category.key ? "active" : "inactive"}
                whileHover="hover"
                whileTap="tap"
                className={`group relative flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category.key
                    ? "text-white shadow-lg shadow-blue-500/25"
                    : darkMode
                    ? "dark:bg-dark-elevated text-gray-300 hover:text-white border border-gray-700/50"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
              >
                {/* Active Background */}
                {filter === category.key && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}

                {/* Content */}
                <div className="relative flex items-center gap-2">
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">
                    {category.key === "all" ? "All" : category.key}
                  </span>
                </div>

                {/* Hover Effect */}
                {filter !== category.key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                      darkMode
                        ? "dark:bg-dark-elevated border border-gray-700/50"
                        : "bg-white border border-gray-200/50"
                    } shadow-lg hover:shadow-2xl`}
                  >
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <button
                        onClick={() => setSelectedImage(item.image)}
                        className="w-full block"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={280}
                          className="w-full h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </button>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedImage(item.image)}
                            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                          >
                            <Eye className="w-4 h-4 text-gray-800" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                          >
                            <Link
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4 text-gray-800" />
                            </Link>
                          </motion.button>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryGradient(
                            item.category
                          )} shadow-lg`}
                        >
                          {getCategoryIcon(item.category)}
                          <span className="uppercase tracking-wide">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6 space-y-4">
                      {/* Title and External Link */}
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className={`text-xl font-bold leading-tight transition-colors group-hover:text-blue-500 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 45 }}
                          className="flex-shrink-0 p-1 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </motion.button>
                      </div>

                      {/* Description */}
                      <p
                        className={`text-sm leading-relaxed ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {item.description}
                      </p>

                      {/* Technologies */}
                      {item.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {item.technologies
                            .slice(0, 3)
                            .map((tech, techIndex) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: techIndex * 0.1,
                                }}
                                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                                  darkMode
                                    ? "bg-gray-700/50 text-gray-300 border border-gray-600/50"
                                    : "bg-gray-100 text-gray-700 border border-gray-200"
                                } hover:border-blue-500/50`}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          {item.technologies.length > 3 && (
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              +{item.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Project Stats */}
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span
                            className={`text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {4.5 + index * 0.1}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span
                            className={`text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            2024
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Github className="w-3 h-3 text-gray-400" />
                          <span
                            className={`text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {Math.floor(Math.random() * 50) + 10}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-300 pointer-events-none" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12 lg:mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                darkMode
                  ? "dark:bg-dark-elevated text-white border border-gray-700/50 hover:border-gray-600"
                  : "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
              }`}
            >
              View More Projects
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
