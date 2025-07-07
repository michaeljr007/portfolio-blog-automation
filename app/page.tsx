"use client";
import React, { useState, useEffect } from "react";
import propertypro from "./assets/images/proDash2.png";
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
    category: "branding",
    image:
      "https://res.cloudinary.com/ded2uopl7/image/upload/v1751851110/pixelperfect_pkmyej.png",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://pixelperfectstudios.ng/",
  },
  {
    id: 2,
    title: "Property Manager Pro",
    description:
      "A comprehensive management tool for property owners with advanced analytics.",
    category: "product",
    image: propertypro,
    technologies: ["Next.js", "MongoDB", "Node.js"],
    link: "https://babakaya.ng/",
  },
  {
    id: 3,
    title: "Bochsystems",
    description:
      "Complete branding and website solution for a cutting-edge tech company.",
    category: "branding",
    image:
      "https://res.cloudinary.com/ded2uopl7/image/upload/v1751851108/boch_systems_htdnay.png",
    technologies: ["Figma", "React", "Framer Motion"],
    link: "https://bochsystems.netlify.app/",
  },
  {
    id: 4,
    title: "Gaga Hotel",
    description:
      "A luxury hotel website with elegant design and smooth interactions.",
    category: "product",
    image:
      "https://res.cloudinary.com/ded2uopl7/image/upload/v1751856448/gagahotel_nk7pzv.png",
    technologies: ["Vue.js", "Nuxt.js", "PostgreSQL"],
    link: "https://gagahotels.com/",
  },
  {
    id: 5,
    title: "Everything Nma Fashion",
    description:
      "E-commerce platform for fashion enthusiasts with modern shopping experience.",
    category: "branding",
    image:
      "https://res.cloudinary.com/ded2uopl7/image/upload/v1751851106/everythingnma_m4btpk.png",
    technologies: ["Shopify", "React", "GraphQL"],
    link: "https://everythingnma.com/",
  },
  {
    id: 6,
    title: "Rehoboth Cables",
    description:
      "Professional website for a leading cable manufacturing company.",
    category: "product",
    image:
      "https://res.cloudinary.com/ded2uopl7/image/upload/v1751851110/rehoboth_mvpjsw.png",
    technologies: ["WordPress", "PHP", "MySQL"],
    link: "https://rehobothstandardcables.com/",
  },
];

export default function Home() {
  const [filter, setFilter] = useState<"all" | "product" | "branding">("all");
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
      <AboutSection darkMode={darkMode} />
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
