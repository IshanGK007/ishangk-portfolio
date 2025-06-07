import { motion } from "framer-motion";
import { BrainIcon, GitBranchIcon, CodeIcon, DatabaseIcon } from "lucide-react";
import { Card } from "./ui/card";

const DreamCompany = () => {
  return (
    <section id="dream-company" className="py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center gradient-text mb-12"
        >
          Dream Company
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <Card 
            className="p-8 card-hover bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full"
            whileHover={{ borderColor: "#6366F1", boxShadow: "0px 15px 25px -5px rgba(0,0,0,0.2)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-8">
              <div className="flex items-center space-x-4">
                <img src="adobe.png" alt="Adobe Logo" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">Adobe Inc.</h3>
              <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl leading-relaxed">
                Global leader in digital media and marketing solutions, empowering creators and enterprises through tools like Photoshop, Illustrator, Acrobat, and Adobe Experience Cloud. Headquartered in San Jose, it serves 85% of Fortune 100 companies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <Card className="p-4 bg-indigo-50 dark:bg-indigo-900">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-2">
                    <BrainIcon className="w-5 h-5" />
                    Key Highlights
                  </h4>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                    <li>• Founded: 1982</li>
                    <li>• CEO: Shantanu Narayen</li>
                    <li>• Known for: PDF, PostScript, Adobe Firefly</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-indigo-50 dark:bg-indigo-900">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-2">
                    <CodeIcon className="w-5 h-5" />
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "C++", "React.js", "Node.js", "PyTorch"].map((skill) => (
                      <span key={skill} className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded text-indigo-600 dark:text-indigo-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="mt-8 text-slate-600 dark:text-slate-300 text-center max-w-2xl">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-4">Why Adobe?</h4>
                <p className="leading-relaxed">
                  My work on AI-based billing using YOLO, full-stack platforms with secure UX, and multi-modal 3D retrieval aligns with Adobe's focus on intelligent media, seamless experiences, and AI-driven content innovation. I'm excited to contribute to and grow within such a dynamic environment.
                </p>
              </div>
              <div className="mt-8 text-slate-600 dark:text-slate-300 text-center max-w-2xl">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-4">Popular Adobe Products:</h4>
                <div className="flex flex-nowrap justify-center gap-4 mt-4 overflow-x-auto pb-4 custom-scrollbar">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px -5px rgba(0,0,0,0.2)", borderColor: "#6366F1" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-6 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700 transition-all duration-300 bg-white dark:bg-slate-800 shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/40 group"
                  >
                    <img src="adobe-audition.png" alt="Adobe Audition" className="w-16 h-16 object-contain mb-3 filter grayscale group-hover:grayscale-0 transition-filter duration-300" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">Audition</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px -5px rgba(0,0,0,0.2)", borderColor: "#6366F1" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-6 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700 transition-all duration-300 bg-white dark:bg-slate-800 shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/40 group"
                  >
                    <img src="adobe-illustrator.png" alt="Adobe Illustrator" className="w-16 h-16 object-contain mb-3 filter grayscale group-hover:grayscale-0 transition-filter duration-300" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">Illustrator</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px -5px rgba(0,0,0,0.2)", borderColor: "#6366F1" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-6 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700 transition-all duration-300 bg-white dark:bg-slate-800 shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/40 group"
                  >
                    <img src="after-effects.png" alt="Adobe After Effects" className="w-16 h-16 object-contain mb-3 filter grayscale group-hover:grayscale-0 transition-filter duration-300" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">After Effects</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px -5px rgba(0,0,0,0.2)", borderColor: "#6366F1" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-6 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700 transition-all duration-300 bg-white dark:bg-slate-800 shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/40 group"
                  >
                    <img src="photoshop-lightroom.png" alt="Photoshop Lightroom" className="w-16 h-16 object-contain mb-3 filter grayscale group-hover:grayscale-0 transition-filter duration-300" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">Lightroom</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px -5px rgba(0,0,0,0.2)", borderColor: "#6366F1" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-6 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700 transition-all duration-300 bg-white dark:bg-slate-800 shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/40 group"
                  >
                    <img src="premiere.png" alt="Adobe Premiere Pro" className="w-16 h-16 object-contain mb-3 filter grayscale group-hover:grayscale-0 transition-filter duration-300" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">Premiere Pro</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DreamCompany;
