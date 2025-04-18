
import { motion } from "framer-motion";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { Card } from "./ui/card";

const CVDownload = () => {
  return (
    <section id="cv" className="py-16 bg-slate-50 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center gradient-text mb-12"
        >
          Curriculum Vitae
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Card className="p-8 card-hover bg-white border border-slate-200 w-full">
            <div className="flex flex-col items-center space-y-6">
              <FileTextIcon className="w-12 h-12 text-indigo-600" />
              <h3 className="text-xl font-semibold text-slate-800">Download My CV</h3>
              <p className="text-slate-600 text-center">Get a detailed overview of my skills and experiences</p>
              <a
                href="/path-to-your-cv.pdf"
                download
                className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Download CV</span>
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CVDownload;
