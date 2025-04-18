
import { motion } from "framer-motion";
import { BuildingIcon, StarIcon } from "lucide-react";
import { Card } from "./ui/card";

const DreamCompany = () => {
  return (
    <section id="dream-company" className="py-20 bg-white px-4">
      <div className="max-w-7xl mx-auto">
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
          className="flex justify-center"
        >
          <Card className="p-8 card-hover bg-white border border-slate-200 w-full max-w-2xl">
            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-center space-x-2">
                <BuildingIcon className="w-8 h-8 text-indigo-600" />
                <StarIcon className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800">Adobe</h3>
              <p className="text-slate-600 text-center max-w-lg">
                Aspiring to join Adobe to contribute to innovative digital experiences and creative solutions that impact millions of users worldwide.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DreamCompany;
