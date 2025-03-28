
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // No authentication check needed, all users can access admin routes
  return <Outlet />;
};

export default ProtectedRoute;
