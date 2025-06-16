
import { useState } from 'react';
import Layout from '../components/Layout';
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const { toast } = useToast();
  
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order tracking
    toast({
      title: "Order tracking",
      description: `Looking up order #${orderNumber}`,
    });
  };
  
  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">Track Your Order</h1>
        
        <div className="max-w-xl mx-auto">
          <div className="animate-fade-in">
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">Order Number</label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-brand-green"
                  required
                  placeholder="e.g. AM12345678"
                />
              </div>
              <div>
                <label htmlFor="orderEmail" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="orderEmail"
                  value={orderEmail}
                  onChange={(e) => setOrderEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-brand-green"
                  required
                  placeholder="Email used for the order"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-green text-white py-3 text-sm uppercase tracking-wider hover:bg-brand-lightGreen transition-colors"
              >
                Track Order
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">Need help with your order?</p>
              <a href="/contact" className="text-brand-green hover:underline">Contact Customer Support</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
