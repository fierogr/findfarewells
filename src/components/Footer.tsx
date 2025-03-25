
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FindFarewells</h3>
            <p className="text-muted-foreground">
              Helping you find compassionate funeral services at transparent prices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: info@findfarewells.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/40">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} FindFarewells. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
