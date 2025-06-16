import Layout from '../components/Layout';
import { Truck, Package, Map, Clock } from 'lucide-react';

const Shipping = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-center">Shipping & Delivery</h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          At Amprio Milano, we strive to deliver your premium tableware and home decor items safely and efficiently. Below you'll find our shipping policies and delivery information.
        </p>
        
        {/* Shipping info cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="border p-6 text-center">
            <Truck size={40} className="mx-auto mb-4 text-brand-green" />
            <h3 className="font-medium text-lg mb-2">Free Standard Shipping</h3>
            <p className="text-gray-600 text-sm">On all orders over AED 500 within UAE</p>
          </div>
          
          <div className="border p-6 text-center">
            <Package size={40} className="mx-auto mb-4 text-brand-green" />
            <h3 className="font-medium text-lg mb-2">Secure Packaging</h3>
            <p className="text-gray-600 text-sm">All items are carefully packed to ensure safe delivery</p>
          </div>
          
          <div className="border p-6 text-center">
            <Map size={40} className="mx-auto mb-4 text-brand-green" />
            <h3 className="font-medium text-lg mb-2">International Shipping</h3>
            <p className="text-gray-600 text-sm">Available to most countries worldwide</p>
          </div>
          
          <div className="border p-6 text-center">
            <Clock size={40} className="mx-auto mb-4 text-brand-green" />
            <h3 className="font-medium text-lg mb-2">Order Processing</h3>
            <p className="text-gray-600 text-sm">Orders are processed within 1-2 business days</p>
          </div>
        </div>
        
        {/* Shipping policies content */}
        <div className="max-w-3xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-serif mb-4">Shipping to UAE</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left border">Shipping Method</th>
                  <th className="p-3 text-left border">Delivery Time</th>
                  <th className="p-3 text-left border">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border">Standard Shipping</td>
                  <td className="p-3 border">3-5 business days</td>
                  <td className="p-3 border">AED 25 (Free on orders over AED 500)</td>
                </tr>
                <tr>
                  <td className="p-3 border">Express Shipping</td>
                  <td className="p-3 border">1-2 business days</td>
                  <td className="p-3 border">AED 50</td>
                </tr>
                <tr>
                  <td className="p-3 border">Same-Day Delivery (Dubai only)</td>
                  <td className="p-3 border">Same day if ordered before 12 PM</td>
                  <td className="p-3 border">AED 75</td>
                </tr>
              </tbody>
            </table>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">International Shipping</h2>
            <p className="mb-4 text-gray-600">
              We ship to most countries worldwide. International shipping rates and delivery times vary depending on destination.
            </p>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left border">Region</th>
                  <th className="p-3 text-left border">Delivery Time</th>
                  <th className="p-3 text-left border">Starting From</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border">GCC Countries</td>
                  <td className="p-3 border">3-7 business days</td>
                  <td className="p-3 border">AED 75</td>
                </tr>
                <tr>
                  <td className="p-3 border">Middle East</td>
                  <td className="p-3 border">5-10 business days</td>
                  <td className="p-3 border">AED 120</td>
                </tr>
                <tr>
                  <td className="p-3 border">Europe</td>
                  <td className="p-3 border">7-14 business days</td>
                  <td className="p-3 border">AED 150</td>
                </tr>
                <tr>
                  <td className="p-3 border">North America</td>
                  <td className="p-3 border">7-14 business days</td>
                  <td className="p-3 border">AED 180</td>
                </tr>
                <tr>
                  <td className="p-3 border">Rest of World</td>
                  <td className="p-3 border">10-21 business days</td>
                  <td className="p-3 border">AED 200</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-sm text-gray-600">
              Exact shipping costs will be calculated at checkout based on weight, dimensions, and destination.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Tracking Your Order</h2>
            <p className="text-gray-600">
              Once your order has been shipped, you will receive a shipping confirmation email with a tracking number. 
              You can use this tracking number to monitor the status and location of your package through our website 
              or the carrier's tracking system.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Customs & Import Duties</h2>
            <p className="text-gray-600">
              For international orders, please note that you may be subject to import duties and taxes, which are levied 
              once the package reaches your country. These additional charges are the responsibility of the recipient. 
              Amprio Milano has no control over these charges and cannot predict their amount.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Order Processing</h2>
            <p className="text-gray-600">
              Orders are generally processed within 1-2 business days. During peak seasons or promotional periods, 
              processing times may be slightly longer. Pre-order items will ship on the estimated date indicated on 
              the product page.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Shipping Restrictions</h2>
            <p className="text-gray-600">
              Some items may be restricted from shipping to certain countries due to their size, value, or local regulations. 
              If we are unable to ship an item to your location, we will notify you as soon as possible.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Questions?</h2>
            <p className="text-gray-600">
              If you have any questions about shipping or delivery, please <a href="/contact" className="text-brand-green hover:underline">contact us</a> 
              and our customer service team will be happy to assist you.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
