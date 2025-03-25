
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-semibold text-xl">FindFarewells</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="transition-colors hover:text-foreground/80 text-muted-foreground"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="transition-colors hover:text-foreground/80 text-muted-foreground"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
