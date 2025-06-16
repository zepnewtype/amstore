import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="bg-[#f8f8f8] py-8">
        <div className="container-custom">
          <motion.h1 
            className="text-3xl md:text-4xl font-serif text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h1>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container-custom max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div 
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-serif mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Please fill out the form below or reach out to us using the contact information.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
                    required
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="relative w-full bg-brand-green text-white py-3 px-6 hover:bg-brand-lightGreen transition-colors overflow-hidden"
                  >
                    <span className={`transition-opacity duration-300 ${formSubmitted ? 'opacity-0' : 'opacity-100'}`}>
                      Send Message
                    </span>
                    <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${formSubmitted ? 'opacity-100' : 'opacity-0'}`}>
                      <Check className="mr-2" size={18} /> Message Sent
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Our Store & Office</h3>
                  <p className="text-gray-600">1802 Ontario Tower, Business Bay, Dubai UAE</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Phone Number</h3>
                  <p className="text-gray-600">+971 52 177 3471</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Email Address</h3>
                  <p className="text-gray-600">info@amprio.ae</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Working Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                  <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-brand-green hover:text-brand-lightGreen">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                    </a>
                    <a href="#" className="text-brand-green hover:text-brand-lightGreen">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-brand-green hover:text-brand-lightGreen">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect width="4" height="12" x="2" y="9"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h2 className="text-2xl font-serif mb-6">Location</h2>
                <div className="bg-gray-200 h-72 w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178400825533!2d55.282103!3d25.1857731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d6a56f2a7f%3A0xf94a4e95a8cb9f1a!2sBusiness%20Bay%2C%20Dubai!5e0!3m2!1sen!2sae!4v1669818616705!5m2!1sen!2sae" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ontario Tower location"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
