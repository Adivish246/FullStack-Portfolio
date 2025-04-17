import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-md bg-[#0e0e16]/70 border-b border-primary/10 transition-all duration-300 ${
      isScrolled ? "py-2" : "py-3"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-xl font-['Space_Grotesk'] font-bold bg-gradient-to-r from-[#8a2be2] via-[#00ffff] to-[#39ff14] bg-clip-text text-transparent">
          AV
        </a>
        
        <div className="hidden md:flex space-x-8">
          {["home", "about", "projects", "contact"].map((item) => (
            <a 
              key={item}
              href={`#${item}`} 
              className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300"
              data-nav-link="true">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
        
        <button 
          className="md:hidden text-gray-300 focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-[#1a1a2e]/95 backdrop-blur-md ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          {["home", "about", "projects", "contact"].map((item) => (
            <a 
              key={item}
              href={`#${item}`} 
              className="text-gray-300 hover:text-[#00ffff] transition-colors duration-300 py-2"
              onClick={closeMobileMenu}
              data-nav-link="true">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
