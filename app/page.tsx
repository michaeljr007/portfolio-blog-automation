"use client";
import React, { useState, useEffect } from "react";
import myPic from "./assets/images/myPic.jpg";
import pixelperfect from "./assets/images/pixelperfect.png";
import boch from "./assets/images/boch systems.png";
import discovery from "./assets/images/discovery.png";
import nma from "./assets/images/everythingnma.png";
import propertypro from "./assets/images/proDash2.png";
import rehoboth from "./assets/images/rehoboth.png";
import Header from "./components/Header";
import Nav from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: "app" | "product" | "branding";
  image: any;
  technologies?: string[];
  link?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Pixel Perfect Studios",
    description:
      "A creative studio website with a focus on modern design and seamless user experience.",
    category: "app",
    image: pixelperfect,
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    link: "#",
  },
  {
    id: 2,
    title: "Property Manager Pro",
    description:
      "A comprehensive management tool for property owners with advanced analytics.",
    category: "product",
    image: propertypro,
    technologies: ["Next.js", "MongoDB", "Node.js"],
    link: "#",
  },
  {
    id: 3,
    title: "Bochsystems",
    description:
      "Complete branding and website solution for a cutting-edge tech company.",
    category: "branding",
    image: boch,
    technologies: ["Figma", "React", "Framer Motion"],
    link: "#",
  },
  {
    id: 4,
    title: "Discovery Suites Enugu",
    description:
      "A luxury hotel booking platform with elegant design and smooth interactions.",
    category: "app",
    image: discovery,
    technologies: ["Vue.js", "Nuxt.js", "PostgreSQL"],
    link: "#",
  },
  {
    id: 5,
    title: "Everything Nma Fashion",
    description:
      "E-commerce platform for fashion enthusiasts with modern shopping experience.",
    category: "branding",
    image: nma,
    technologies: ["Shopify", "React", "GraphQL"],
    link: "#",
  },
  {
    id: 6,
    title: "Rehoboth Cables",
    description:
      "Professional website for a leading cable manufacturing company.",
    category: "product",
    image: rehoboth,
    technologies: ["WordPress", "PHP", "MySQL"],
    link: "#",
  },
];

export default function Home() {
  const [filter, setFilter] = useState<"all" | "app" | "product" | "branding">(
    "all"
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "portfolio", "contact"];
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollY >= offsetTop - 100 &&
            scrollY < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredItems =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />
      <Nav
        activeSection={activeSection}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
      />
      <HomeSection darkMode={darkMode} />
      <AboutSection darkMode={darkMode} myPic={myPic} />
      <PortfolioSection
        filter={filter}
        setFilter={setFilter}
        filteredItems={filteredItems}
        setSelectedImage={setSelectedImage}
        darkMode={darkMode}
      />
      <ContactSection darkMode={darkMode} />
      <Footer darkMode={darkMode} />
      <Lightbox
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
