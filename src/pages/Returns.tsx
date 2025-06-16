
import Layout from '../components/Layout';

const Returns = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-center">Returns & Exchanges</h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We want you to be completely satisfied with your purchase. If you're not entirely happy with your order, 
          we're here to help.
        </p>
        
        <div className="max-w-3xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-serif mb-4">Return Policy</h2>
            <p className="mb-4 text-gray-600">
              You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the 
              return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.).
            </p>
            <p className="text-gray-600">
              You should expect to receive your refund within four weeks of giving your package to the return shipper, 
              however, in many cases you will receive a refund more quickly. This time period includes the transit time 
              for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process 
              your return once we receive it (3 to 5 business days), and the time it takes your bank to process our 
              refund request (5 to 10 business days).
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Items Eligible for Return</h2>
            <p className="mb-4 text-gray-600">
              To be eligible for a return, your item must be unused and in the same condition that you received it. 
              It must also be in the original packaging.
            </p>
            <p className="text-gray-600">
              Several types of goods are exempt from being returned. Some examples include:
            </p>
            <ul className="list-disc list-inside ml-4 mt-4 space-y-2 text-gray-600">
              <li>Custom or personalized products</li>
              <li>Perishable goods (like food or flowers)</li>
              <li>Sale items (unless otherwise specified)</li>
              <li>Gift cards</li>
              <li>Downloadable products</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Exchanges</h2>
            <p className="text-gray-600">
              The fastest way to ensure you get what you want is to return the item you have, and once the return is 
              accepted, make a separate purchase for the new item. However, if you prefer an exchange, please contact 
              us before sending your return.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Refunds</h2>
            <p className="mb-4 text-gray-600">
              Once your return is received and inspected, we will send you an email to notify you that we have received 
              your returned item. We will also notify you of the approval or rejection of your refund.
            </p>
            <p className="text-gray-600">
              If approved, your refund will be processed, and a credit will automatically be applied to your original 
              method of payment within a certain amount of days, depending on your card issuer's policies.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Late or Missing Refunds</h2>
            <p className="mb-4 text-gray-600">
              If you haven't received a refund yet, first check your bank account again. Then contact your credit card 
              company, it may take some time before your refund is officially posted.
            </p>
            <p className="text-gray-600">
              If you've done all of this and you still have not received your refund yet, please contact us at 
              <a href="mailto:returns@ampriomilano.com" className="text-brand-green hover:underline ml-1">returns@ampriomilano.com</a>.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Damaged or Defective Items</h2>
            <p className="mb-4 text-gray-600">
              If you receive damaged or defective merchandise, please contact us immediately at 
              <a href="mailto:service@ampriomilano.com" className="text-brand-green hover:underline ml-1">service@ampriomilano.com</a>. 
              We will work with you to resolve the issue promptly.
            </p>
            <p className="text-gray-600">
              Please provide photos of the damaged items and packaging, which will help us process your claim faster.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">How to Return an Item</h2>
            <ol className="list-decimal list-inside ml-4 mt-4 space-y-4 text-gray-600">
              <li>
                <p className="inline font-medium">Contact Customer Service:</p>
                <p className="mt-1">Email us at <a href="mailto:returns@ampriomilano.com" className="text-brand-green hover:underline">returns@ampriomilano.com</a> with your order number and reason for return.</p>
              </li>
              <li>
                <p className="inline font-medium">Receive Return Authorization:</p>
                <p className="mt-1">We'll send you a Return Authorization (RA) number and return instructions.</p>
              </li>
              <li>
                <p className="inline font-medium">Package Your Return:</p>
                <p className="mt-1">Securely pack the item(s) in the original packaging if possible. Include the RA number on the outside of the package.</p>
              </li>
              <li>
                <p className="inline font-medium">Ship Your Return:</p>
                <p className="mt-1">Send your package to the address provided in the return instructions.</p>
              </li>
              <li>
                <p className="inline font-medium">Wait for Processing:</p>
                <p className="mt-1">Once received, we'll inspect the item and process your refund or exchange.</p>
              </li>
            </ol>
          </section>
          
          <section>
            <h2 className="text-2xl font-serif mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our return policy, please contact us at 
              <a href="mailto:service@ampriomilano.com" className="text-brand-green hover:underline ml-1">service@ampriomilano.com</a> or 
              call us at +971 52 177 3471.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Returns;
