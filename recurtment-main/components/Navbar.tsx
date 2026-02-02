import React, { useState } from "react";
import { auth } from "../firebase"; // import firebase auth

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur flex items-center justify-between px-6 py-3">
      <div className="text-[var(--neon-green)] font-bold tracking-wider text-lg">
        CyberShield
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-4 text-sm md:text-base items-center">
        <a href="#home" className="hover-glitch">Home</a>
        <a href="#about" className="hover-glitch">About</a>
        <a href="#contact" className="hover-glitch">Contact</a>
        <button
          onClick={handleLogout}
          className="ml-4 px-3 py-1 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black rounded text-sm"
        >
          Logout
        </button>
      </nav>

      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-[var(--neon-green)]"></span>
            <span className="block w-6 h-0.5 bg-[var(--neon-green)]"></span>
            <span className="block w-6 h-0.5 bg-[var(--neon-green)]"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 flex flex-col items-center py-4 space-y-3 md:hidden">
          <a href="#home" className="hover-glitch" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" className="hover-glitch" onClick={() => setIsOpen(false)}>About</a>
          <a href="#contact" className="hover-glitch" onClick={() => setIsOpen(false)}>Contact</a>
          <button
            onClick={() => { handleLogout(); setIsOpen(false); }}
            className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black rounded text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
