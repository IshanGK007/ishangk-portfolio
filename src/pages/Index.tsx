
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Code, Database, Brain } from "lucide-react";
import ExperienceSection from "@/components/ExperienceSection";
import CVDownload from "@/components/CVDownload";
import DreamCompany from "@/components/DreamCompany";
import Achievements from "@/components/Achievements";
import { Card } from "@/components/ui/card";
import "../styles/custom.css";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.span 
                className="text-xl font-semibold gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Ishan Kulkarni
              </motion.span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "experience", "projects", "skills", "achievements", "dream-company", "cv", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => smoothScroll(section)}
                  className={`${
                    activeSection === section
                      ? "text-indigo-600 font-medium"
                      : "text-slate-600 hover:text-indigo-500"
                  } capitalize transition-colors duration-200`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 hero-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold mb-6 gradient-text">
              Ishan Girish Kulkarni
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              "Stay Hungry, Stay Foolish" - Aspiring Software Engineer
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-slate-600 hover:text-indigo-500 transition-colors p-2 rounded-full hover:bg-slate-100">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-slate-600 hover:text-indigo-500 transition-colors p-2 rounded-full hover:bg-slate-100">
                <Github size={24} />
              </a>
              <a href="mailto:ikishankulkarni16@gmail.com" 
                className="text-slate-600 hover:text-indigo-500 transition-colors p-2 rounded-full hover:bg-slate-100">
                <Mail size={24} />
              </a>
              <a href="tel:+918431457815" 
                className="text-slate-600 hover:text-indigo-500 transition-colors p-2 rounded-full hover:bg-slate-100">
                <Phone size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="about" className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center gradient-text mb-12"
          >
            Education
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "B.Tech",
                institution: "Engineering College",
                year: "2020-2024",
                details: "Computer Science & Engineering"
              },
              {
                title: "PUC",
                institution: "Pre-University College",
                year: "2018-2020",
                details: "Science Stream"
              },
              {
                title: "SSLC",
                institution: "Secondary School",
                year: "2018",
                details: "High School Education"
              },
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow card-hover bg-white border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{edu.title}</h3>
                  <p className="text-slate-600">{edu.institution}</p>
                  <p className="text-slate-500 text-sm">{edu.year}</p>
                  <p className="text-indigo-600 mt-2 text-sm">{edu.details}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section with enhanced visuals */}
      <section id="projects" className="py-20 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center gradient-text mb-12"
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Vision-Based Billing System",
                description: "Automated product detection and billing system using advanced computer vision technology.",
                tech: ["Python", "YOLOv11", "Computer Vision"],
                icon: Code,
              },
              {
                title: "Car Rental System",
                description: "Full-stack application with secure payment integration and real-time booking.",
                tech: ["React", "Node.js", "MongoDB", "Express", "Razorpay"],
                icon: Database,
              },
              {
                title: "EDA on Thyroid Disease Dataset",
                description: "Advanced data analysis project with machine learning applications.",
                tech: ["Python", "Pandas", "Data Analysis", "ML"],
                icon: Brain,
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="col-span-1"
              >
                <Card className="p-6 h-full card-hover bg-white border border-slate-200">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <project.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">{project.title}</h3>
                      <p className="text-slate-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with improved visualization */}
      <section id="skills" className="py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center gradient-text mb-12"
          >
            Technical Skills
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "C", "C++", "Python", "React",
              "Machine Learning", "Data Analysis",
              "Node.js", "MongoDB",
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 text-center card-hover border border-slate-200"
              >
                <span className="text-slate-700 font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <Achievements />

      {/* Dream Company Section */}
      <DreamCompany />

      {/* CV Download Section */}
      <CVDownload />

      {/* Contact Section with enhanced design */}
      <section id="contact" className="py-20 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center gradient-text mb-12"
          >
            Get in Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg text-slate-600 mb-8">
              Ready to collaborate on innovative projects? Let's connect!
            </p>
            <div className="flex flex-col items-center space-y-6">
              <a
                href="mailto:ikishankulkarni16@gmail.com"
                className="flex items-center space-x-3 text-slate-700 hover:text-indigo-600 transition-colors group"
              >
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:bg-indigo-50 transition-colors">
                  <Mail size={20} />
                </div>
                <span>ikishankulkarni16@gmail.com</span>
              </a>
              <a
                href="tel:+918431457815"
                className="flex items-center space-x-3 text-slate-700 hover:text-indigo-600 transition-colors group"
              >
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:bg-indigo-50 transition-colors">
                  <Phone size={20} />
                </div>
                <span>+91-8431457815</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-slate-700 hover:text-indigo-600 transition-colors group"
              >
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:bg-indigo-50 transition-colors">
                  <Linkedin size={20} />
                </div>
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
