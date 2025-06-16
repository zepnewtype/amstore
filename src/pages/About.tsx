
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-fashion-black">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1612015700218-14d90072fcf8?q=80&w=1770&auto=format&fit=crop" 
            alt="Amprio Milano workshop" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-6">
            <h1 className="text-5xl md:text-6xl text-white font-serif mb-6">Our Story</h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Born from a passion for craftsmanship and timeless elegance, 
              Amprio Milano represents the pinnacle of Italian luxury fashion.
            </p>
          </div>
        </div>
      </section>

      {/* Our Heritage */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-gold-DEFAULT mb-3">Our Heritage</h2>
              <h3 className="text-3xl md:text-4xl font-serif mb-6">A Legacy of Excellence</h3>
              <p className="text-fashion-black/70 leading-relaxed mb-6">
                Founded in 2008 by visionary designer Alessandro Romano, Amprio Milano quickly established itself as a beacon of sophistication in the world of luxury fashion. What began as a small atelier in the heart of Milan has grown into an internationally recognized brand, while staying true to its foundational principles.
              </p>
              <p className="text-fashion-black/70 leading-relaxed">
                Every Amprio Milano piece tells a story of uncompromising quality, drawing upon generations of Italian craftsmanship tradition. Our artisans, many of whom have been with us since the beginning, bring decades of expertise to each creation, ensuring that every stitch and detail meets our exacting standards.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1451290337906-ac938fc89bce?q=80&w=1182&auto=format&fit=crop" 
                alt="Amprio Milano heritage" 
                className="w-full h-auto rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-fashion-gray/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-gold-DEFAULT mb-3">Our Philosophy</h2>
            <h3 className="text-3xl md:text-4xl font-serif mb-6">Timeless Elegance, Modern Vision</h3>
            <p className="text-fashion-black/70 leading-relaxed">
              At Amprio Milano, we believe that true luxury transcends trends. We create pieces that not only capture the essence of contemporary style but are designed to be treasured for generations. Our commitment to sustainable practices ensures that our legacy of beauty is matched by responsible stewardship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 shadow-sm">
              <div className="w-16 h-16 bg-gold-DEFAULT/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gold-DEFAULT text-2xl font-serif">01</span>
              </div>
              <h4 className="text-xl font-serif mb-4">Exceptional Craftsmanship</h4>
              <p className="text-fashion-black/70">
                Each piece is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations.
              </p>
            </div>

            <div className="text-center bg-white p-8 shadow-sm">
              <div className="w-16 h-16 bg-gold-DEFAULT/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gold-DEFAULT text-2xl font-serif">02</span>
              </div>
              <h4 className="text-xl font-serif mb-4">Superior Materials</h4>
              <p className="text-fashion-black/70">
                We source only the finest materials from trusted suppliers who share our commitment to quality and ethical practices.
              </p>
            </div>

            <div className="text-center bg-white p-8 shadow-sm">
              <div className="w-16 h-16 bg-gold-DEFAULT/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gold-DEFAULT text-2xl font-serif">03</span>
              </div>
              <h4 className="text-xl font-serif mb-4">Sustainable Luxury</h4>
              <p className="text-fashion-black/70">
                We embrace sustainable practices throughout our production process, creating timeless pieces that minimize environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-gold-DEFAULT mb-3">Meet Our Team</h2>
            <h3 className="text-3xl md:text-4xl font-serif mb-6">The Visionaries Behind Amprio Milano</h3>
            <p className="text-fashion-black/70 leading-relaxed">
              Our team combines decades of industry expertise with fresh, innovative perspectives. United by a passion for excellence, they work tirelessly to bring the Amprio Milano vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="aspect-square overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop" 
                  alt="Alessandro Romano - Founder & Creative Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-serif mb-1">Alessandro Romano</h4>
              <p className="text-fashion-black/70 mb-4">Founder & Creative Director</p>
              <p className="text-sm text-fashion-black/60 leading-relaxed max-w-xs mx-auto">
                With over 20 years of experience in luxury fashion, Alessandro's vision drives the artistic direction of Amprio Milano.
              </p>
            </div>

            <div className="text-center">
              <div className="aspect-square overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=870&auto=format&fit=crop" 
                  alt="Sofia Bianchi - Head of Design" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-serif mb-1">Sofia Bianchi</h4>
              <p className="text-fashion-black/70 mb-4">Head of Design</p>
              <p className="text-sm text-fashion-black/60 leading-relaxed max-w-xs mx-auto">
                Sofia brings contemporary sensibility to Amprio Milano's timeless aesthetic, leading our innovative design team.
              </p>
            </div>

            <div className="text-center">
              <div className="aspect-square overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=870&auto=format&fit=crop" 
                  alt="Marco Rossi - Master Artisan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-serif mb-1">Marco Rossi</h4>
              <p className="text-fashion-black/70 mb-4">Master Artisan</p>
              <p className="text-sm text-fashion-black/60 leading-relaxed max-w-xs mx-auto">
                With over 30 years of experience, Marco oversees production, ensuring every piece meets our exacting standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Image */}
      <section className="py-20 bg-fashion-black text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581078835641-53fda36fde6f?q=80&w=1172&auto=format&fit=crop" 
                alt="Amprio Milano workshop" 
                className="w-full h-auto rounded-sm"
              />
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-gold-DEFAULT mb-3">Our Values</h2>
              <h3 className="text-3xl md:text-4xl font-serif mb-6">The Principles That Guide Us</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold-DEFAULT/20 flex items-center justify-center rounded-sm shrink-0">
                    <span className="text-gold-DEFAULT text-xl font-serif">Q</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Quality Without Compromise</h4>
                    <p className="text-white/70 leading-relaxed">
                      We never sacrifice quality for convenience or cost. Every Amprio Milano piece represents the pinnacle of craftsmanship.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold-DEFAULT/20 flex items-center justify-center rounded-sm shrink-0">
                    <span className="text-gold-DEFAULT text-xl font-serif">E</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Ethical Production</h4>
                    <p className="text-white/70 leading-relaxed">
                      We maintain fair and transparent relationships with our artisans, suppliers, and partners throughout our supply chain.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold-DEFAULT/20 flex items-center justify-center rounded-sm shrink-0">
                    <span className="text-gold-DEFAULT text-xl font-serif">S</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Sustainability</h4>
                    <p className="text-white/70 leading-relaxed">
                      We are committed to minimizing our environmental footprint through responsible material sourcing and production practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-6">Visit Our Flagship Store</h2>
            <p className="text-fashion-black/70 leading-relaxed mb-8">
              Experience the world of Amprio Milano at our flagship store in the heart of Milan. 
              Our knowledgeable staff will guide you through our collections and provide a personalized shopping experience.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <div>
                <h4 className="font-serif mb-2">Milano Flagship</h4>
                <address className="text-fashion-black/70 not-italic">
                  Via Monte Napoleone, 12<br />
                  20121 Milano, Italy<br />
                  <a href="tel:+3902123456789" className="text-gold-DEFAULT hover:underline">+39 02 1234 5678</a>
                </address>
              </div>
              <div className="h-12 w-px bg-gray-200 hidden md:block"></div>
              <div>
                <h4 className="font-serif mb-2">Opening Hours</h4>
                <p className="text-fashion-black/70">
                  Monday - Saturday: 10:00 - 19:00<br />
                  Sunday: 11:00 - 17:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
