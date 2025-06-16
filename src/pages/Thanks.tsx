import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const Thanks = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container-custom py-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="mx-auto h-20 w-20 text-brand-green mb-6" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-serif text-4xl mb-4">Thank You for Your Order!</h1>
            <p className="text-gray-600 mb-8">
              Your order has been received and is now being processed. 
              An email confirmation has been sent to your email address.
            </p>
            
            <div className="bg-gray-50 rounded-md p-6 mb-8 text-left">
              <h3 className="font-serif text-lg mb-3">Order Details</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">#AMP12345</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>Credit Card</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping Method:</span>
                  <span>Standard Delivery</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>340.00 AED</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-8">
              If you have any questions about your order, please contact our customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account"
                className="py-3 px-6 border border-brand-green text-brand-green flex items-center justify-center gap-2 hover:bg-brand-green hover:text-white transition-colors rounded-sm"
              >
                Track Your Order
              </Link>
              
              <Link
                to="/"
                className="py-3 px-6 bg-brand-green text-white flex items-center justify-center gap-2 hover:bg-brand-lightGreen transition-colors rounded-sm"
              >
                <ShoppingBag size={18} className="mr-1" />
                Continue Shopping
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Thanks;
