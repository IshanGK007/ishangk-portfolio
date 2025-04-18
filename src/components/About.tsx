
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { GraduationCap, Code2, Brain, Rocket } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-slate-50 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center gradient-text mb-12"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <Card className="p-8 bg-white shadow-lg border border-slate-200">
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 leading-relaxed">
                I am Ishan Girish Kulkarni, a Computer Science undergraduate at KLE Technological University with a strong foundation in full-stack development, AI, and data analysis. I've worked on real-world projects ranging from intelligent retail systems to 3D object retrieval using deep learning.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Code2 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Full-Stack Development</h3>
                  <p className="text-sm text-slate-600">Experienced in React.js, Python, and building scalable solutions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Brain className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">AI & Machine Learning</h3>
                  <p className="text-sm text-slate-600">Deep learning, computer vision, and data analysis expertise</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white border border-slate-200">
              <div className="flex items-center space-x-4 mb-4">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <h3 className="font-semibold text-slate-800">Education</h3>
              </div>
              <p className="text-slate-600">B.Tech in Computer Science</p>
              <p className="text-sm text-slate-500">KLE Technological University</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white border border-slate-200">
              <div className="flex items-center space-x-4 mb-4">
                <Rocket className="w-6 h-6 text-indigo-600" />
                <h3 className="font-semibold text-slate-800">Research</h3>
              </div>
              <p className="text-slate-600">CEVI Research Intern</p>
              <p className="text-sm text-slate-500">Text and 3D Vision Research</p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
