
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-semibold text-xl">Riprice</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Αρχική
            </Link>
            <Link
              to="/about"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              Σχετικά
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:text-foreground/80 text-muted-foreground"
            >
              Επικοινωνία
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/register-funeral-home" className="flex items-center">
              <UserPlus className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Εγγραφή Γραφείου Τελετών</span>
              <span className="sm:hidden">Εγγραφή</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
