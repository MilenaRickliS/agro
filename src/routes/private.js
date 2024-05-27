import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/authContext/index";

export default function Private({ children }) {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}