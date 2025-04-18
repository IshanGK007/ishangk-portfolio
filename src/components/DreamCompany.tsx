import { motion } from "framer-motion";
import { BuildingIcon, StarIcon, BrainIcon, GitBranchIcon, CodeIcon, DatabaseIcon } from "lucide-react";
import { Card } from "./ui/card";

const DreamCompany = () => {
  return (
    <section id="dream-company" className="py-16 bg-gradient-to-b from-white to-slate-50 px-4">
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
          <Card className="p-8 card-hover bg-white border border-slate-200 w-full">
            <div className="flex flex-col items-center space-y-8">
              <div className="flex items-center space-x-4">
                <BuildingIcon className="w-12 h-12 text-indigo-600" />
                <StarIcon className="w-10 h-10 text-yellow-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800">Adobe Inc.</h3>
              <p className="text-slate-600 text-center max-w-2xl leading-relaxed">
                Global leader in digital media and marketing solutions, empowering creators and enterprises through tools like Photoshop, Illustrator, Acrobat, and Adobe Experience Cloud. Headquartered in San Jose, it serves 85% of Fortune 100 companies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <Card className="p-4 bg-indigo-50">
                  <h4 className="font-semibold text-indigo-700 mb-2 flex items-center gap-2">
                    <BrainIcon className="w-5 h-5" />
                    Key Highlights
                  </h4>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• Founded: 1982</li>
                    <li>• CEO: Shantanu Narayen</li>
                    <li>• Known for: PDF, PostScript, Adobe Firefly</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-indigo-50">
                  <h4 className="font-semibold text-indigo-700 mb-2 flex items-center gap-2">
                    <CodeIcon className="w-5 h-5" />
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "C++", "React.js", "Node.js", "PyTorch"].map((skill) => (
                      <span key={skill} className="text-xs bg-white px-2 py-1 rounded text-indigo-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="mt-8 text-slate-600 text-center max-w-2xl">
                <h4 className="font-semibold text-indigo-700 mb-4">Why Adobe?</h4>
                <p className="leading-relaxed">
                  My work on AI-based billing using YOLO, full-stack platforms with secure UX, and multi-modal 3D retrieval aligns with Adobe's focus on intelligent media, seamless experiences, and AI-driven content innovation. I'm excited to contribute to and grow within such a dynamic environment.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DreamCompany;
