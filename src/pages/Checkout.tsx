import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from 'framer-motion';
import { useCart } from '@/components/Cart';

// Form schema using zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }),
  street: z.string().min(3, { message: 'Please enter your street address' }),
  apartment: z.string().optional(),
  city: z.string().min(2, { message: 'Please enter your city' }),
  postalCode: z.string().min(5, { message: 'Please enter a valid postal code' }),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<'details' | 'address' | 'review'>('details');
  const [coordinates, setCoordinates] = useState({ lat: 25.1972, lng: 55.2744 }); // Dubai default
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items } = useCart();
  
  // Calculate order totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 20;
  const total = subtotal + shipping;
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      street: '',
      apartment: '',
      city: 'Dubai',
      postalCode: '',
      note: ''
    }
  });

  const goToStep = (step: 'details' | 'address' | 'review') => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Map placeholder function - in a real implementation, this would update with the Mapbox API
  const handleMapClick = (e: React.MouseEvent) => {
    // This is just a placeholder - in a real implementation we would use the Mapbox SDK
    const mapElement = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - mapElement.left;
    const y = e.clientY - mapElement.top;
    
    // Convert click to fake coordinates (this is just for UI demo)
    const newLat = 25.1972 + ((y - mapElement.height/2) * 0.0001);
    const newLng = 55.2744 + ((x - mapElement.width/2) * 0.0001);
    
    setCoordinates({ lat: newLat, lng: newLng });
    
    // In a real implementation, we would use reverse geocoding to get the address
    form.setValue('street', '123 Example Street');
    form.setValue('postalCode', '12345');
  };

  // Process order
  const onSubmit = async (data: FormValues) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call to Shopify
      console.log('Submitting order data:', { ...data, coordinates, items });
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Order submitted successfully!",
        description: "Redirecting to payment...",
        duration: 3000,
      });
      
      // In a real implementation, this would redirect to Shopify payment page
      setTimeout(() => {
        navigate('/thanks');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Error submitting order",
        description: "Please try again later",
        duration: 3000,
      });
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="font-serif text-3xl mb-4">Checkout</h1>
            
            {/* Checkout steps */}
            <div className="flex justify-between items-center mt-8 mb-12">
              <div className="flex-1">
                <button 
                  onClick={() => goToStep('details')}
                  className={`w-full relative ${currentStep === 'details' ? 'text-brand-green font-medium' : 'text-gray-400'}`}
                >
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 border-2 ${currentStep === 'details' ? 'border-brand-green bg-brand-green/5' : 'border-gray-300'}`}>
                    <span>1</span>
                  </div>
                  <span className="text-sm">Customer Details</span>
                  {currentStep === 'details' && (
                    <motion.div 
                      className="absolute w-full h-0.5 bg-brand-green -bottom-1"
                      layoutId="activeStep"
                    />
                  )}
                </button>
              </div>
              
              <div className="w-24 h-px bg-gray-300 mx-1"></div>
              
              <div className="flex-1">
                <button 
                  onClick={() => form.formState.isValid ? goToStep('address') : null}
                  className={`w-full relative ${currentStep === 'address' ? 'text-brand-green font-medium' : 'text-gray-400'}`}
                >
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 border-2 ${currentStep === 'address' ? 'border-brand-green bg-brand-green/5' : 'border-gray-300'}`}>
                    <span>2</span>
                  </div>
                  <span className="text-sm">Shipping Address</span>
                  {currentStep === 'address' && (
                    <motion.div 
                      className="absolute w-full h-0.5 bg-brand-green -bottom-1"
                      layoutId="activeStep"
                    />
                  )}
                </button>
              </div>
              
              <div className="w-24 h-px bg-gray-300 mx-1"></div>
              
              <div className="flex-1">
                <button 
                  onClick={() => (form.formState.isValid ? goToStep('review') : null)}
                  className={`w-full relative ${currentStep === 'review' ? 'text-brand-green font-medium' : 'text-gray-400'}`}
                >
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 border-2 ${currentStep === 'review' ? 'border-brand-green bg-brand-green/5' : 'border-gray-300'}`}>
                    <span>3</span>
                  </div>
                  <span className="text-sm">Review Order</span>
                  {currentStep === 'review' && (
                    <motion.div 
                      className="absolute w-full h-0.5 bg-brand-green -bottom-1"
                      layoutId="activeStep"
                    />
                  )}
                </button>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Customer details */}
                {currentStep === 'details' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+971 5X XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          form.trigger(['name', 'email', 'phone']);
                          if (form.getValues('name') && form.getValues('email') && form.getValues('phone')) {
                            goToStep('address');
                          }
                        }}
                        className="w-full py-3 bg-brand-green text-white flex items-center justify-center gap-2 hover:bg-brand-lightGreen transition-colors rounded-sm"
                      >
                        <span>Continue to Shipping</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Address details */}
                {currentStep === 'address' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 mb-6 text-sm text-gray-600">
                      <MapPin size={18} />
                      <span>Select your location on the map or enter address manually</span>
                    </div>
                    
                    {/* Map placeholder - in a real implementation this would be a Mapbox map */}
                    <div 
                      className="relative border border-gray-200 rounded-md overflow-hidden mb-6 cursor-crosshair"
                      onClick={handleMapClick}
                    >
                      <AspectRatio ratio={16/9} className="bg-gray-100">
                        <div className="w-full h-full bg-[#e5eef4] relative">
                          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
                            Map integration placeholder - click to set location
                          </div>
                          {/* Map pin */}
                          <div 
                            className="absolute"
                            style={{
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -100%)'
                            }}
                          >
                            <MapPin size={36} className="text-brand-green" />
                          </div>
                        </div>
                      </AspectRatio>
                      <div className="absolute bottom-2 left-2 bg-white px-3 py-2 text-xs shadow-md rounded">
                        Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Street address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apartment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Apartment, suite, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal / ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Postal code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => goToStep('details')}
                        className="flex-1 py-3 border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors rounded-sm"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          form.trigger(['street', 'city', 'postalCode']);
                          if (form.getValues('street') && form.getValues('city') && form.getValues('postalCode')) {
                            goToStep('review');
                          }
                        }}
                        className="flex-1 py-3 bg-brand-green text-white flex items-center justify-center gap-2 hover:bg-brand-lightGreen transition-colors rounded-sm"
                      >
                        <span>Continue to Review</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 3: Review and confirm */}
                {currentStep === 'review' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Display order items with thumbnails */}
                    <div className="bg-gray-50 p-6 rounded-md">
                      <h3 className="font-medium text-lg mb-4">Order Items</h3>
                      <ul className="space-y-4">
                        {items.map(item => (
                          <li key={item.id} className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-white border rounded">
                              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                            </div>
                            <div className="font-medium">
                              {(item.price * item.quantity).toFixed(2)} AED
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Order summary */}
                    <div className="bg-gray-50 p-6 rounded-md space-y-4">
                      <h3 className="font-medium text-lg mb-4">Order Summary</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>{subtotal.toFixed(2)} AED</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span>{shipping.toFixed(2)} AED</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-medium">
                          <span>Total</span>
                          <span>{total.toFixed(2)} AED</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Customer information */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Customer</h3>
                        <button 
                          type="button" 
                          onClick={() => goToStep('details')}
                          className="text-sm text-brand-green hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="text-gray-600">
                        <p>{form.getValues('name')}</p>
                        <p>{form.getValues('email')}</p>
                        <p>{form.getValues('phone')}</p>
                      </div>
                    </div>
                    
                    {/* Shipping information */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Shipping Address</h3>
                        <button 
                          type="button" 
                          onClick={() => goToStep('address')}
                          className="text-sm text-brand-green hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="text-gray-600">
                        <p>{form.getValues('street')}</p>
                        {form.getValues('apartment') && <p>{form.getValues('apartment')}</p>}
                        <p>{form.getValues('city')}, {form.getValues('postalCode')}</p>
                        <p className="text-xs mt-1">GPS: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}</p>
                      </div>
                    </div>
                    
                    {/* Order note */}
                    <div>
                      <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order Notes (optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any special instructions for delivery or product preferences"
                                className="resize-none" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => goToStep('address')}
                        className="flex-1 py-3 border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors rounded-sm"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 py-3 bg-brand-green text-white flex items-center justify-center gap-2 hover:bg-brand-lightGreen transition-colors rounded-sm disabled:opacity-70"
                      >
                        {isProcessing ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard size={18} className="mr-2" />
                            Proceed to Payment
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
