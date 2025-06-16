"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Search, User, Phone, Truck } from "lucide-react"
import Footer from "./Footer"
import CartIcon from "./CartIcon"
import { useToast } from "@/hooks/use-toast"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

interface LayoutProps {
  children: React.ReactNode
}

// Обновить стили хедера для лучшей адаптивности
const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { toast } = useToast()
  const isMobile = window.innerWidth < 768

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <>
      {/* Announcement Bar - Height set to 40px on mobile, 56px on desktop */}
      <div className="bg-brand-green text-white py-2 md:py-4 px-4 text-xs md:text-sm h-auto md:h-14">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-1 md:gap-0">
          <div className="flex items-center">
            <Truck size={16} className="mr-1 md:mr-2" />
            <div className="text-center md:text-left">
              FAST SHIPPING IN UAE{" "}
              <a href="/shipping" className="underline ml-1">
                learn more
              </a>
            </div>
          </div>
          <div className="flex items-center mt-1 md:mt-0">
            <Phone size={14} className="mr-1 md:mr-2" />
            <div>+971 52 177 3471</div>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm py-2" : "bg-white py-3 md:py-6"
        }`}
      >
        <div className="container-custom flex flex-col items-center">
          {/* Hide logo completely when scrolled */}
          {!isScrolled && (
            <Link to="/" className="mb-2 md:mb-6">
              <img
                src="https://cdn.shopify.com/s/files/1/0592/5152/3702/files/AMP_LOGO_FULL.svg?v=1735227680"
                alt="Amprio Milano"
                className="h-16 md:h-28"
              />
            </Link>
          )}

          <div className="w-full flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 -ml-2" // Увеличенная зона клика
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation with NavigationMenu */}
            <div className="hidden md:block w-full">
              <NavigationMenu className="mx-auto">
                <NavigationMenuList className="justify-center">
                  <NavigationMenuItem>
                    <Link
                      to="/"
                      className={`uppercase text-xs tracking-wide font-medium px-4 ${location.pathname === "/" ? "text-brand-green" : "text-gray-700 hover:text-brand-green transition-colors"}`}
                    >
                      New In
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to="/products"
                      className={`uppercase text-xs tracking-wide font-medium px-4 ${location.pathname === "/products" ? "text-brand-green" : "text-gray-700 hover:text-brand-green transition-colors"}`}
                    >
                      All Products
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="uppercase text-xs tracking-wide font-medium">
                      Collections
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brand-lightGreen/50 to-brand-green/50 p-6 no-underline outline-none focus:shadow-md"
                              to="/collections"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium text-black">All Collections</div>
                              <p className="text-sm leading-tight text-black/90">
                                Explore our curated collections of premium tableware and decorative items
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <Link
                            to="/collection/tableware"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Tableware</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Elegant dining solutions for every occasion
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/collection/outdoor"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Outdoor</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Durable and stylish options for outdoor entertaining
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/collection/home-decor"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Home Decor</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Accent pieces to elevate your interior
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to="/tableware"
                      className={`uppercase text-xs tracking-wide font-medium px-4 ${location.pathname.includes("/tableware") ? "text-brand-green" : "text-gray-700 hover:text-brand-green transition-colors"}`}
                    >
                      Tableware
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to="/interior"
                      className={`uppercase text-xs tracking-wide font-medium px-4 ${location.pathname.includes("/interior") ? "text-brand-green" : "text-gray-700 hover:text-brand-green transition-colors"}`}
                    >
                      Interior
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to="/outdoor"
                      className={`uppercase text-xs tracking-wide font-medium px-4 ${location.pathname.includes("/outdoor") ? "text-brand-green" : "text-gray-700 hover:text-brand-green transition-colors"}`}
                    >
                      Outdoor
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="uppercase text-xs tracking-wide font-medium">
                      Business
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[600px] p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-lg font-medium mb-2">HoReCa Solutions</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Premium tableware for hospitality businesses
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <Link
                                to="/business/restaurants"
                                className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                              >
                                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                  >
                                    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                                    <path d="M6 7v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                                    <path d="M3 7h18" />
                                    <path d="M9 14v2" />
                                    <path d="M15 14v2" />
                                  </svg>
                                </div>
                                <span className="text-sm">Restaurants</span>
                              </Link>
                              <Link
                                to="/business/hotels"
                                className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                              >
                                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                  >
                                    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                                    <path d="M5 12h14" />
                                    <path d="M9 12v5" />
                                    <path d="M15 12v5" />
                                    <path d="M3 21h18" />
                                  </svg>
                                </div>
                                <span className="text-sm">Hotels</span>
                              </Link>
                              <Link
                                to="/business/beach-clubs"
                                className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                              >
                                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                  >
                                    <path d="M2 22a20.3 20.3 0 0 1 20 0" />
                                    <path d="M12 6a4 4 0 0 0-4 7h8a4 4 0 0 0-4-7z" />
                                    <path d="M12 3v3" />
                                    <path d="m6.82 7.3 2.12 2.13" />
                                    <path d="m15.06 9.43 2.12-2.13" />
                                  </svg>
                                </div>
                                <span className="text-sm">Beach Clubs</span>
                              </Link>
                              <Link
                                to="/business/yachts"
                                className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                              >
                                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                  >
                                    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                    <path d="m20 20-5-18h-4c0 3-2 5-5 5v3a7 7 0 0 0 7 7h9.5" />
                                    <path d="M12 11h0" />
                                  </svg>
                                </div>
                                <span className="text-sm">Yachts</span>
                              </Link>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium mb-2">Business Services</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Custom solutions and expert consultation
                            </p>
                            <ul className="space-y-2">
                              <li>
                                <Link to="/business/consultation" className="text-sm hover:text-brand-green">
                                  • Tableware Consultation
                                </Link>
                              </li>
                              <li>
                                <Link to="/business/custom-orders" className="text-sm hover:text-brand-green">
                                  • Custom Orders
                                </Link>
                              </li>
                              <li>
                                <Link to="/business/wholesale" className="text-sm hover:text-brand-green">
                                  • Wholesale Pricing
                                </Link>
                              </li>
                              <li>
                                <Link to="/contact" className="text-sm hover:text-brand-green">
                                  • Contact Business Team
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to="/contact"
                      className={`uppercase text-xs tracking-wide font-medium px-4 ${location.pathname === "/contact" ? "text-brand-green" : "text-gray-700 hover:text-brand-green transition-colors"}`}
                    >
                      Contact
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-5">
              <Link to="/search" aria-label="Search" className="p-2 -mr-2 hover:text-brand-green transition-colors">
                <Search size={22} />
              </Link>
              <Link to="/account" aria-label="Account" className="p-2 -mr-2 hover:text-brand-green transition-colors">
                <User size={22} />
              </Link>
              <CartIcon />
            </div>
          </div>
        </div>

        {/* Mobile menu - улучшенная версия с большими зонами клика */}
        <div
          className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container-custom py-4">
            <ul className="space-y-0">
              <li>
                <Link
                  to="/"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/" ? "text-brand-green" : "text-gray-700"}`}
                >
                  New In
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/products" ? "text-brand-green" : "text-gray-700"}`}
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/collections" || location.pathname.startsWith("/collection/") ? "text-brand-green" : "text-gray-700"}`}
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/tableware"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/tableware" ? "text-brand-green" : "text-gray-700"}`}
                >
                  Tableware
                </Link>
              </li>
              <li>
                <Link
                  to="/interior"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname.includes("/interior") ? "text-brand-green" : "text-gray-700"}`}
                >
                  Interior
                </Link>
              </li>
              <li>
                <Link
                  to="/outdoor"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/outdoor" ? "text-brand-green" : "text-gray-700"}`}
                >
                  Outdoor
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/contact" ? "text-brand-green" : "text-gray-700"}`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/about" ? "text-brand-green" : "text-gray-700"}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/shipping" ? "text-brand-green" : "text-gray-700"}`}
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/returns" ? "text-brand-green" : "text-gray-700"}`}
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className={`block py-3 uppercase text-sm tracking-wide font-medium ${location.pathname === "/privacy" ? "text-brand-green" : "text-gray-700"}`}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="min-h-screen">{children}</main>

      <Footer />

      {/* Chatbot button - увеличенный размер для мобильных */}
      <button
        className="fixed bottom-6 right-6 bg-brand-green text-white w-14 h-14 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-brand-lightGreen transition-colors z-30"
        aria-label="Chat Support"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
      </button>
    </>
  )
}

export default Layout
