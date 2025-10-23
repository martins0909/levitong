import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-[#FFD700] dark:bg-gray-900 shadow-sm">
      <div className="flex justify-between items-center py-1.5 px-4 sm:px-8 xl:px-16 h-14">
        
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={assets.levitonimage}
          alt="logo"
          className="w-16 sm:w-20 cursor-pointer"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-gray-700 dark:text-gray-200 text-sm leading-none">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => navigate(link.path)}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}

          {/* ✅ Always show Sign In & Sign Up */}
          <button
            onClick={() => navigate("/signin")}
            className="flex items-center gap-2 rounded-full text-xs cursor-pointer bg-primary text-[#FFD700] px-4 py-1 shadow hover:opacity-90"
          >
            Sign In
            <img src={assets.arrow} className="w-3" alt="arrow" />
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="ml-2 flex items-center gap-2 rounded-full text-xs cursor-pointer border border-primary text-[#FFD700] px-4 py-1 shadow hover:bg-primary hover:text-[#FFD700]"
          >
            Sign Up
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FFD700] dark:bg-gray-800 flex flex-col items-start px-6 py-2 gap-2 shadow">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
              className="w-full text-left py-1 text-sm border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            >
              {link.label}
            </button>
          ))}

          {/* ✅ Always show Sign In & Sign Up on Mobile */}
          <button
            onClick={() => {
              navigate("/signin");
              setIsOpen(false);
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-full text-xs cursor-pointer bg-primary text-[#FFD700] px-4 py-1"
          >
            Sign In
            <img src={assets.arrow} className="w-3" alt="arrow" />
          </button>
          <button
            onClick={() => {
              navigate("/signup");
              setIsOpen(false);
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-full text-xs cursor-pointer border border-primary text-[#FFD700] px-4 py-1 hover:bg-primary hover:text-[#FFD700]"
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
