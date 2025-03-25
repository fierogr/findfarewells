
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-16 animate-fadeIn">
      <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6">404</h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-center max-w-md">
        We couldn't find the page you were looking for.
      </p>
      <Link to="/">
        <Button className="px-6">Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
