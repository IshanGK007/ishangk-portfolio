
import { motion } from "framer-motion";
import { AwardIcon } from "lucide-react";
import { Card } from "./ui/card";

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-slate-50 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center gradient-text mb-12"
        >
          Achievements
        </motion.h2>
        <div className="grid gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Vision-Based Automated Billing Systems Using YOLO",
              event: "3rd Congress on Control, Robotics, and Mechatronics",
              location: "Warangal"
            },
            {
              title: "A machine learning approach for analyzing and predicting hypothyroidism based on hormonal change",
              event: "5th International Conference on Machine Learning, IoT and Big Data (ICMIB)",
              year: "2025"
            }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 card-hover bg-white border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <AwardIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{achievement.title}</h3>
                    <p className="text-slate-600">{achievement.event}</p>
                    {achievement.location && <p className="text-slate-500">{achievement.location}</p>}
                    {achievement.year && <p className="text-slate-500">{achievement.year}</p>}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
