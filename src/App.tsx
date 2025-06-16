import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/Cart";
import Index from "./pages/Index";
import Product from "./pages/Product";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";
import AllProducts from "./pages/AllProducts";
import Contact from "./pages/Contact";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";
import Account from "./pages/Account";

// Add Framer Motion animation settings for route transitions
const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products/:handle" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:handle" element={<Collection />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/account" element={<Account />} />
            <Route path="/tableware" element={<Collection />} />
            <Route path="/interior" element={<Collection />} />
            <Route path="/outdoor" element={<Collection />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
