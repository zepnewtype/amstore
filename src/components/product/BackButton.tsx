
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const BackButton = () => {
  const navigate = useNavigate();
  
  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(-1); // Go back to previous page in history
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <a 
        href="#" 
        onClick={handleGoBack}
        className="inline-flex items-center text-sm text-gray-600 hover:text-brand-green transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back
      </a>
    </motion.div>
  );
};

export default BackButton;
