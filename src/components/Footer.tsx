
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/cf99ce96-ddda-41a2-aae6-1dad8d00e818.png" 
                alt="Restinprice Logo" 
                className="h-10" 
              />
            </div>
            <p className="text-muted-foreground">
              Σας βοηθάμε να βρείτε συμπονετικές υπηρεσίες κηδείας με διαφανείς τιμές.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Σύνδεσμοι</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Αρχική
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Σχετικά με Εμάς
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Επικοινωνία
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Πολιτική Απορρήτου
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Επικοινωνία</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: info@restinprice.gr</li>
              <li>Τηλέφωνο: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/40">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Restinprice. Με επιφύλαξη παντός δικαιώματος.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
