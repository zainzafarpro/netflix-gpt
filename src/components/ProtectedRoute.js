import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedin, children }) => {
  if (!isLoggedin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
