import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";

const CVDownload = () => {
  return (
    <motion.a
      href="https://drive.google.com/file/d/1B4MzvL05j_jzOVHYfZs8I_gRqqbNoPyZ/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
    >
      <DownloadIcon className="w-5 h-5" />
      <span>Download CV</span>
    </motion.a>
  );
};

export default CVDownload;
