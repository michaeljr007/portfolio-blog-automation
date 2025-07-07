import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Code,
  Github,
  Linkedin,
  Monitor,
  Palette,
  Smartphone,
  Twitter,
  Download,
  Mail,
  Calendar,
  Star,
} from "lucide-react";

interface AboutSectionProps {
  darkMode: boolean;
}

const skills = [
  { name: "Frontend Development", icon: Code, percentage: 95 },
  { name: "UI/UX Design", icon: Palette, percentage: 90 },
  { name: "Mobile Development", icon: Smartphone, percentage: 85 },
  { name: "Backend Development", icon: Monitor, percentage: 80 },
];

export default function AboutSection({ darkMode }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={`py-20 relative overflow-hidden ${
        darkMode ? "dark:bg-dark-surface" : "bg-gray-50"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6"
            >
              <Award className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">
                About Me
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={`text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Turning Ideas Into{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Digital Reality
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
              Passionate about creating exceptional digital experiences that
              combine beautiful design with powerful functionality.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute top-5 right-4 w-20 h-20 bg-blue-500/20 rounded-2xl rotate-12 group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="absolute bottom-4 left-6 w-16 h-16 bg-purple-500/20 rounded-2xl -rotate-12 group-hover:-rotate-6 transition-transform duration-300"></div>

                {/* Main Image */}
                <div className="relative">
                  <Image
                    src="https://res.cloudinary.com/ded2uopl7/image/upload/v1751851099/myPic_t1hgcf.jpg"
                    alt="Professional Portrait"
                    width={520}
                    height={120}
                    className="rounded-2xl w-full shadow-2xl relative z-10 object-cover scale-[0.8]" // Reduced size by 20%
                  />

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                    viewport={{ once: true }}
                    className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Award className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Content Section (unchanged) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <p
                  className={`text-lg leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Hi, I'm{" "}
                  <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Michael Isih
                  </span>
                  , a passionate web developer and designer with over 5 years of
                  experience creating digital solutions that make a difference.
                  I specialize in building responsive, user-centered
                  applications that combine beautiful design with powerful
                  functionality.
                </p>
              </div>

              {/* Skills Section */}
              <div className="space-y-6">
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Technical Expertise
                </h3>
                <div className="grid gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                          <skill.icon className="w-4 h-4 text-blue-500" />
                        </div>
                        <span
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {skill.name}
                        </span>
                        <span className="ml-auto text-sm font-semibold text-blue-500">
                          {skill.percentage}%
                        </span>
                      </div>
                      <div
                        className={`w-full h-2 rounded-full overflow-hidden ${
                          darkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{
                            duration: 1.2,
                            delay: index * 0.1,
                            ease: "easeOut",
                          }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </motion.button>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 pt-4">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    viewport={{ once: true }}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
