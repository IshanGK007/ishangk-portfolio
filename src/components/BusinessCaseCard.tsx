import { motion } from "framer-motion";
import { Card } from "./ui/card";
import React from "react";

interface BusinessCaseCardProps {
  businessCase: any;
  onExpand: () => void;
}

const BusinessCaseCard: React.FC<BusinessCaseCardProps> = ({ businessCase, onExpand }) => {
  return (
    <motion.div
      className="col-span-1 business-case-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6 h-full card-hover bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="relative">
          {/* Header Section */}
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 gradient-text">{businessCase.title}</h3>

          {/* Concepts Display */}
          {businessCase.concepts && businessCase.concepts.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {businessCase.concepts.map((concept: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                >
                  {concept}
                </span>
              ))}
            </div>
          )}

          {/* Content Sections for collapsed view - showing only the introduction */}
          {/* Assuming the first section is always the introduction */}
          {businessCase.sections.length > 0 && businessCase.sections[0].content && (
            <div className="space-y-2">
              {businessCase.sections[0].content.map((text: string, textIndex: number) => (
                <p key={textIndex} className="text-slate-600 dark:text-slate-300">{text}</p>
              ))}
            </div>
          )}

          {/* "View Details" button for collapsed cards */}
          <button
            className="mt-6 bg-indigo-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
            onClick={onExpand}
          >
            View Details
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export default BusinessCaseCard; 