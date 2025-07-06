import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageCircle,
  CheckCircle,
  Sparkles,
} from "lucide-react";

interface ContactSectionProps {
  darkMode: boolean;
}

export default function ContactSection({ darkMode }: ContactSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Reset form after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    }, 3000);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation: any = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@yourname.com",
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      color: "bg-gradient-to-r from-green-500 to-teal-600",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New York, NY",
      color: "bg-gradient-to-r from-pink-500 to-red-600",
    },
  ];

  return (
    <section
      id="contact"
      className={`relative py-24 overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-dark-surface to-gray-800"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [10, -10, 10],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-blue-300" : "text-blue-600"
                }`}
              >
                Let's Connect
              </span>
            </motion.div>

            <h2
              className={`text-5xl md:text-6xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Let's Work
              </span>
              <br />
              Together
            </h2>

            <p
              className={`text-xl max-w-2xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Ready to bring your ideas to life? Let's discuss your project and
              create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                variants={cardVariants}
                className={`p-8 rounded-2xl backdrop-blur-sm border ${
                  darkMode
                    ? "bg-dark-elevated/50 border-gray-700/50"
                    : "bg-white/70 border-gray-200/50"
                } shadow-xl`}
              >
                <h3
                  className={`text-3xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        darkMode
                          ? "hover:bg-gray-700/30"
                          : "hover:bg-gray-50/80"
                      }`}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`p-3 ${item.color} text-white rounded-xl shadow-lg`}
                      >
                        <item.icon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <p
                          className={`font-semibold ${
                            darkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {item.label}
                        </p>
                        <p
                          className={`text-lg ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Decorative card */}
              <motion.div
                variants={cardVariants}
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  darkMode
                    ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20"
                    : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/30"
                } shadow-lg`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                  <h4
                    className={`text-lg font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Quick Response
                  </h4>
                </div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  I typically respond within 24 hours and look forward to
                  discussing your project in detail.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <motion.div
                variants={cardVariants}
                className={`p-8 rounded-2xl backdrop-blur-sm border ${
                  darkMode
                    ? "bg-dark-elevated/50 border-gray-700/50"
                    : "bg-white/70 border-gray-200/50"
                } shadow-xl`}
              >
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                      className="group"
                    >
                      <label
                        className={`block text-sm font-semibold mb-3 ${
                          darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        <User className="w-4 h-4 inline mr-2" />
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${
                          darkMode
                            ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="John"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                      className="group"
                    >
                      <label
                        className={`block text-sm font-semibold mb-3 ${
                          darkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        <User className="w-4 h-4 inline mr-2" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${
                          darkMode
                            ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Doe"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                    className="group"
                  >
                    <label
                      className={`block text-sm font-semibold mb-3 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="john@example.com"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                    className="group"
                  >
                    <label
                      className={`block text-sm font-semibold mb-3 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Message
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none ${
                        darkMode
                          ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="Tell me about your project..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg ${
                      isSubmitted
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    } text-white flex items-center justify-center gap-3`}
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.div>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
