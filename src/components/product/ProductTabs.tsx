
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductTabsProps {
  description: string;
  details: string[];
}

const ProductTabs = ({ description, details }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <>
      <motion.div 
        className="border-b border-gray-200 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-3 px-4 text-sm transition-colors ${
              activeTab === 'description' ? 'border-b-2 border-brand-green font-medium' : 'text-gray-500'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 text-sm transition-colors ${
              activeTab === 'details' ? 'border-b-2 border-brand-green font-medium' : 'text-gray-500'
            }`}
          >
            Details
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        className="text-sm leading-relaxed text-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        key={activeTab}
      >
        {activeTab === 'description' && (
          <p>{description}</p>
        )}
        
        {activeTab === 'details' && (
          <ul className="list-disc list-inside space-y-2">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        )}
      </motion.div>
    </>
  );
};

export default ProductTabs;
