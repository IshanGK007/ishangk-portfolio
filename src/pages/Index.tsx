import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import ExperienceSection from "@/components/ExperienceSection";
import CVDownload from "@/components/CVDownload";
import DreamCompany from "@/components/DreamCompany";
import Achievements from "@/components/Achievements";
import { Card } from "@/components/ui/card";
import { Code, Database, Brain, GitBranchIcon, GithubIcon, MailIcon, Server, Layout, FileCode, Box, RefreshCcw, LineChart, PenTool, Palette, Globe, Eye } from 'lucide-react';
import { businessCases } from '@/data/businessCases';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import CodeModal from '../components/CodeModal';

const BusinessCaseCard = lazy(() => import("@/components/BusinessCaseCard"));

// Add a simple skeleton card for loading state
const BusinessCaseCardSkeleton = () => (
  <div className="col-span-1 animate-pulse">
    <div className="p-6 h-full card-hover bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden rounded-lg">
      <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
      <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded mt-6"></div>
    </div>
  </div>
);

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [expandedBusinessCaseId, setExpandedBusinessCaseId] = useState<number | null>(null);
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [selectedCode, setSelectedCode] = useState<{ code: string; title: string } | null>(null);

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

  const messages = ["Welcome to my portfolio", "I'm Ishan Kulkarni"];
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (charIndex < messages[messageIndex].length) {
        setText((prev) => prev + messages[messageIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
          setCharIndex(0);
          setText("");
        }, 1000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [charIndex, messageIndex, messages]);

  const handleViewCode = async (codePath: string, title: string) => {
    try {
      console.log('Loading code from:', codePath);
      // Add a timestamp to prevent caching
      const response = await fetch(`${codePath}?t=${Date.now()}`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`Failed to load code file: ${response.status} ${response.statusText}`);
      }
      const code = await response.text();
      console.log('Code loaded successfully, length:', code.length);
      if (!code || code.trim().length === 0) {
        throw new Error('Code file is empty');
      }
      setSelectedCode({ code, title });
    } catch (error) {
      console.error('Error loading code:', error);
      // Show error in the modal
      setSelectedCode({ 
        code: `Error loading code: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease check the browser console for more details.`, 
        title 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 dark:text-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-0 sm:px-2 lg:px-4">
          <div className="flex justify-between h-16 items-center w-full">
            {/* Logo at extreme left */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md flex items-center justify-center font-extrabold text-lg shadow-lg border-2 border-white hover:scale-110 transition-transform duration-200 ml-2 mr-8">
                IK
              </div>
            </motion.div>
            {/* Nav items right-aligned */}
            <div className="hidden md:flex items-center space-x-8 ml-auto">
              {["home", "about", "education","experience", "projects", "skills", "achievements", "dream-company","business-cases", "connect-cv"].map((section) => (
                <motion.button
                  key={section}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => smoothScroll(section)}
                  className={`${
                    activeSection === section
                      ? "text-indigo-600 dark:text-indigo-400 font-medium"
                      : "text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                  } capitalize transition-colors duration-200 relative group px-2`}
                >
                  {section === "connect-cv" ? "Connect & CV" : section}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ))}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500 " />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-20 pb-20 px-4 hero-gradient dark:bg-slate-900 dark:text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="gradient-text typing-cursor">{text}</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
            >
              "Stay Hungry, Stay Foolish" - Aspiring Software Engineer
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center space-x-6 mt-6"
            >
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/ishan-kulkarni-42361832a", label: "LinkedIn" },
                { icon: Github, href: "https://github.com/IshanGK007/", label: "GitHub" },
                { icon: Mail, href: "mailto:ikishankulkarni16@gmail.com", label: "Email" },
                { icon: Phone, href: "tel:+918431457815", label: "Phone" },
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-slate-600 hover:text-indigo-500 transition-colors p-2 rounded-full hover:bg-slate-100 flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-12"
          >
            About Me
          </motion.h2>

          <div className="flex flex-col-reverse md:flex-row justify-between items-center">
            {/* Left Section - Text Block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <p className="text-2xl mb-6">
                Hey, I'm <span className="font-bold text-blue-600">Ishan Kulkarni</span>, a passionate software engineer
                who loves to work at the intersection of technology and creativity. Currently pursuing a B.Tech in Computer
                Science & Engineering, I'm deeply interested in <strong>Machine Learning, AI, and Web Development</strong>.
              </p>

              <p className="text-2xl mb-6">
                My journey began with problem-solving, and today I'm excited to dive into complex challenges with innovative solutions.
                Whether it's coding a website or designing machine learning models, I'm always eager to explore new ideas and learn.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-lg">
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300 ease-in-out p-4 rounded-xl">
                  <i className="fas fa-laptop-code text-blue-600 dark:text-blue-200 text-3xl"></i>
                  <span className="font-semibold dark:text-blue-200">Web Development</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300 ease-in-out p-4 rounded-xl">
                  <i className="fas fa-robot text-blue-600 dark:text-blue-200 text-3xl"></i>
                  <span className="font-semibold dark:text-blue-200">Machine Learning</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300 ease-in-out p-4 rounded-xl">
                  <i className="fas fa-database text-blue-600 dark:text-blue-200 text-3xl"></i>
                  <span className="font-semibold dark:text-blue-200">Data Science</span>
                </div>
              </div>
            </motion.div>

            {/* Right Section - Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full md:w-1/3 mb-8 md:mb-0"
            >
              <img 
                src="Ishan_image.png" 
                alt="Ishan Kulkarni" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-xl mb-4">
              When I'm not coding, I'm diving into new books, attending tech events, and collaborating with other
              passionate individuals in the tech community. I believe in continuous learning and strive to contribute to
              open-source projects and creative endeavors.
            </p>

            <p className="text-xl">
              Let's connect! Feel free to reach out if you want to collaborate or just chat about technology.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="education" className="py-20 bg-white dark:bg-slate-900 px-4">
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
                <Card className="p-6 h-full card-hover bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{edu.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{edu.institution}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{edu.year}</p>
                  <p className="text-indigo-600 dark:text-indigo-300 mt-2 text-sm">{edu.details}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ExperienceSection />

      <section id="projects" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 px-4">
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
                title: "Text-Based 3D Object Retrieval",
                description: "Developed a system to retrieve 3D models using natural language queries by combining PointNet, EfficientNetV2, and CLIP for multi-modal embedding. Improved retrieval accuracy on the ANIMAR dataset and optimized feature extraction.",
                tech: ["Python", "PointNet", "EfficientNetV2", "CLIP"],
                icon: Brain,
              },
              {
                title: "Vision-Based Billing System",
                description: "Created an automated billing solution by detecting product instances in images using YOLOv11. Automated bill generation based on object count, achieving 94.33% mAP accuracy.",
                tech: ["Python", "YOLOv11", "Computer Vision", "Deep Learning"],
                icon: Code,
              },
              {
                title: "Car Rental System",
                description: "Built a full-stack platform for car rentals with Razorpay integration, JWT authentication, and RESTful APIs. Enhanced UX with OTP recovery and feedback system.",
                tech: ["React.js", "Node.js", "MongoDB", "Razorpay"],
                icon: Database,
              },
              {
                title: "Thyroid Disease Analysis",
                description: "Conducted EDA on thyroid datasets using Python and visualization libraries. Applied SMOTE for balancing and Gradient Boosting, achieving 96.37% accuracy.",
                tech: ["Python", "Pandas", "SMOTE", "Gradient Boosting"],
                icon: Brain,
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="col-span-1"
              >
                <Card className="p-6 h-full card-hover bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                      <project.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">{project.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium"
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

      <section id="skills" className="py-16 bg-white dark:bg-slate-900 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center gradient-text mb-10"
          >
            Technical Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: 'Programming Languages',
                skills: [
                  { name: 'C', icon: Code },
                  { name: 'C++', icon: Code },
                  { name: 'Python', icon: Code },
                  { name: 'JavaScript', icon: FileCode },
                ]
              },
              {
                category: 'Frontend',
                skills: [
                  { name: 'HTML', icon: Layout },
                  { name: 'CSS', icon: Palette },
                  { name: 'React.js', icon: RefreshCcw },
                  { name: 'Tailwind CSS', icon: PenTool },
                ]
              },
              {
                category: 'Backend',
                skills: [
                  { name: 'Node.js', icon: Server },
                  { name: 'Express.js', icon: Server },
                  { name: 'MongoDB', icon: Database },
                ]
              },
              {
                category: 'Libraries & Frameworks',
                skills: [
                  { name: 'NumPy', icon: Brain },
                  { name: 'Pandas', icon: LineChart },
                  { name: 'Seaborn', icon: LineChart },
                  { name: 'Scikit-learn', icon: Brain },
                  { name: 'PyTorch', icon: Brain },
                ]
              },
              {
                category: 'Computer Vision',
                skills: [
                  { name: 'OpenCV', icon: Eye },
                  { name: 'YOLO', icon: Box },
                ]
              },
              {
                category: 'Tools',
                skills: [
                  { name: 'Git', icon: GitBranchIcon },
                  { name: 'GitHub', icon: GithubIcon },
                  { name: 'Postman', icon: Globe },
                ]
              }
            ].map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4"
              >
                <h3 className="text-lg font-semibold mb-4 text-center text-slate-800 dark:text-white">
                  {group.category}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {group.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 }}
                      className="bg-white dark:bg-slate-800 rounded-lg p-2 text-center card-hover border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-2"
                    >
                      <skill.icon className="w-6 h-6 text-indigo-600" />
                      <span className="text-slate-700 dark:text-white font-medium text-xs text-center">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Achievements />

      <DreamCompany />

      <section id="business-cases" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center gradient-text mb-12"
          >
            Business Cases
          </motion.h2>

          {/* Render expanded view if a business case is expanded */}
          {expandedBusinessCaseId !== null ? (
            // Find the expanded business case
            businessCases.find(bc => bc.id === expandedBusinessCaseId) ? (
              <div key={expandedBusinessCaseId} className="expanded-business-case-view fixed top-0 left-0 w-full h-full bg-white dark:bg-slate-900 z-50 overflow-y-auto p-6 md:p-12">
                {/* Show Less Button - Top */}
                <button
                  className="show-less-button text-indigo-600 font-semibold mb-8 flex items-center hover:underline"
                  onClick={() => {
                    setExpandedBusinessCaseId(null);
                    setTimeout(() => {
                      const cards = document.querySelectorAll('.business-case-card');
                      if (clickedCardIndex !== null && cards[clickedCardIndex]) {
                        cards[clickedCardIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Cases
                </button>

                {/* Expanded Content */}
                <div className="max-w-5xl mx-auto">
                  {/* Find the actual business case object to work with */}
                  {businessCases.find(bc => bc.id === expandedBusinessCaseId) && (
                    <>
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 mb-8 shadow-lg">
                        <h1 className="text-4xl font-bold text-white mb-4">
                          {businessCases.find(bc => bc.id === expandedBusinessCaseId)?.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                          {businessCases.find(bc => bc.id === expandedBusinessCaseId)?.concepts.map((concept, index) => (
                            <span
                              key={index}
                              className="px-4 py-1 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur-sm"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Iterate through sections to render content */}
                      {businessCases.find(bc => bc.id === expandedBusinessCaseId)?.sections.map((section, sectionIndex) => (
                        <section key={sectionIndex} className="mb-12 bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md border border-slate-200 dark:border-slate-700">
                          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
                            {section.heading}
                          </h2>

                          {/* Render workflow image if available - moved before content */}
                          {section.heading === "Integrated Workflow" && section.image && (
                            <div className="mb-8 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                              <img 
                                src={section.image} 
                                alt={`${businessCases.find(bc => bc.id === expandedBusinessCaseId)?.title} Workflow`}
                                className="w-full h-auto rounded-lg shadow-lg"
                                style={{ maxHeight: '800px', objectFit: 'contain' }}
                              />
                            </div>
                          )}

                          {/* Render content array if available */}
                          {section.content && section.content.length > 0 && (
                            <div className="space-y-4 text-slate-600 dark:text-slate-300">
                              {section.content.map((item: string | { text: string; link: string }, itemIndex) => {
                                if (typeof item === 'string') {
                                  return (
                                    <p key={itemIndex} className="leading-relaxed">{item}</p>
                                  );
                                } else if ('text' in item && 'link' in item) {
                                  return (
                                    <a
                                      key={itemIndex}
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                      {item.text}
                                    </a>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          )}

                          {/* Render sub_sections if available */}
                          {section.sub_sections && section.sub_sections.length > 0 && (
                            <div className="space-y-12">
                              {section.sub_sections.map((enhancement, enhIndex) => (
                                <div key={enhIndex} className="enhancement-card bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                                  {/* Image Section */}
                                  {enhancement.image && (
                                    <div className="w-full bg-white dark:bg-slate-800 p-6 flex justify-center">
                                      <img 
                                        src={enhancement.image} 
                                        alt={enhancement.name}
                                        className="w-full h-auto rounded-lg shadow-md"
                                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                                      />
                                    </div>
                                  )}

                                  {/* Content Section */}
                                  <div className="p-8">
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{enhancement.name}</h3>

                                    {/* Core Idea */}
                                    {enhancement.details.definition_core_idea && (
                                      <div className="mb-6">
                                        <h6 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Core Idea:</h6>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{enhancement.details.definition_core_idea}</p>
                                      </div>
                                    )}

                                    {/* How It Helps */}
                                    {enhancement.details.how_it_helps && (
                                      <div className="mb-6">
                                        <h6 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-2">How It Helps:</h6>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{enhancement.details.how_it_helps}</p>
                                      </div>
                                    )}

                                    {/* Advantages & Impact */}
                                    {enhancement.details.advantages_impact && enhancement.details.advantages_impact.length > 0 && (
                                      <div className="mb-6">
                                        <h6 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Advantages & Impact:</h6>
                                        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 leading-relaxed ml-4 space-y-2">
                                          {enhancement.details.advantages_impact.map((advantage, advIndex) => (
                                            <li key={advIndex}>{advantage}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Outcome */}
                                    {enhancement.details.outcome && (
                                      <div className="mb-6">
                                        <h6 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-2">Outcome:</h6>
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{enhancement.details.outcome}</p>
                                      </div>
                                    )}

                                    {/* Complexity Information */}
                                    {enhancement.details.complexity && (
                                      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mt-6 border border-slate-200 dark:border-slate-700">
                                        <h6 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-4">Complexity Analysis:</h6>
                                        <div className="grid grid-cols-2 gap-4">
                                          {enhancement.details.complexity.time_complexity && (
                                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                                              <span className="font-medium text-slate-800 dark:text-white">Time:</span>
                                              <span className="text-slate-600 dark:text-slate-300 ml-2">{enhancement.details.complexity.time_complexity}</span>
                                            </div>
                                          )}
                                          {enhancement.details.complexity.space_complexity && (
                                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                                              <span className="font-medium text-slate-800 dark:text-white">Space:</span>
                                              <span className="text-slate-600 dark:text-slate-300 ml-2">{enhancement.details.complexity.space_complexity}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Code Button */}
                                    {enhancement.code && (
                                      <div className="mt-8 flex justify-center">
                                        <button
                                          onClick={() => handleViewCode(enhancement.code!, enhancement.name)}
                                          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                        >
                                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                          </svg>
                                          View Code
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Render impact and trade-offs if available */}
                          {section.details && (section.details.impact || section.details.trade_offs) && (
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                              {section.details.impact && section.details.impact.length > 0 && (
                                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
                                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Positive Impacts
                                  </h3>
                                  <ul className="space-y-2">
                                    {section.details.impact.map((impact, impactIndex) => (
                                      <li key={impactIndex} className="text-green-700 dark:text-green-300 flex items-start">
                                        <span className="mr-2">•</span>
                                        {impact}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {section.details.trade_offs && section.details.trade_offs.length > 0 && (
                                <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-6 border border-red-200 dark:border-red-800">
                                  <h3 className="font-semibold text-red-700 dark:text-red-300 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    Trade-Offs
                                  </h3>
                                  <ul className="space-y-2">
                                    {section.details.trade_offs.map((tradeoff, tradeoffIndex) => (
                                      <li key={tradeoffIndex} className="text-red-700 dark:text-red-300 flex items-start">
                                        <span className="mr-2">•</span>
                                        {tradeoff}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </section>
                      ))}

                      {/* Show Less Button - Bottom */}
                      <button
                        className="show-less-button mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors block mx-auto flex items-center"
                        onClick={() => {
                          setExpandedBusinessCaseId(null);
                          setTimeout(() => {
                            const cards = document.querySelectorAll('.business-case-card');
                            if (clickedCardIndex !== null && cards[clickedCardIndex]) {
                              cards[clickedCardIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }, 100);
                        }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Show Less
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : null
          ) : (
            // If no card is expanded, render the grid of collapsed cards
            <Suspense fallback={
              <div className="grid md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <BusinessCaseCardSkeleton key={i} />
                ))}
              </div>
            }>
              <div className="grid md:grid-cols-2 gap-8">
                {businessCases.map((businessCase, index) => (
                  <BusinessCaseCard
                    key={businessCase.id}
                    businessCase={businessCase}
                    onExpand={() => {
                      setClickedCardIndex(index);
                      setExpandedBusinessCaseId(businessCase.id);
                    }}
                  />
                ))}
              </div>
            </Suspense>
          )}
        </div>
      </section>

      {/* Combined CV Download and Contact Section */}
      <section id="connect-cv" className="py-20 bg-slate-50 dark:bg-slate-900 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center gradient-text mb-12"
          >
            Connect & CV
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-8 border border-slate-200 dark:border-slate-700"
          >
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 text-center">
              Ready to collaborate on innovative projects? Let's connect!
            </p>
            
            {/* Contact Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                {
                  href: "mailto:ikishankulkarni16@gmail.com",
                  icon: MailIcon,
                  text: "ikishankulkarni16@gmail.com",
                  label: "Email"
                },
                {
                  href: "tel:+918431457815",
                  icon: Phone,
                  text: "+91-8431457815",
                  label: "Phone"
                },
                {
                  href: "https://www.linkedin.com/in/ishan-kulkarni-42361832a",
                  icon: Linkedin,
                  text: "LinkedIn Profile",
                  label: "LinkedIn"
                },
                {
                  href: "https://github.com/IshanGK007",
                  icon: GithubIcon,
                  text: "GitHub Profile",
                  label: "GitHub"
                }
              ].map(({ href, icon: Icon, text, label }, index) => (
                <motion.a
                  key={text}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center p-4 space-x-4 rounded-lg hover:bg-slate-50 transition-all group"
                >
                  <div className="p-3 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-indigo-600">{label}</span>
                    <span className="text-sm text-slate-600">{text}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* CV Download Button - Centered */}
            <div className="flex justify-center">
              <CVDownload />
            </div>
          </motion.div>
        </div>
      </section>

      <CodeModal
        isOpen={selectedCode !== null}
        onClose={() => setSelectedCode(null)}
        code={selectedCode?.code || ''}
        title={selectedCode?.title || ''}
      />
    </div>
  );
};
export default Index;
