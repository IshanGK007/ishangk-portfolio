import { motion } from "framer-motion";
import { BriefcaseIcon } from "lucide-react";
import { Card } from "./ui/card";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center gradient-text mb-12"
        >
          Experience
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 card-hover bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                  <BriefcaseIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Project Intern – CEVI, Hubballi</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">Jan 2025 - Present</p>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                    <li>Built a text-based 3D object retrieval system using PointNet, EfficientNetV2, and CLIP.</li>
                    <li>Optimized ANIMAR dataset processing for accurate model matching.</li>
                    <li>Presented work during CEVI research discussions.</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
