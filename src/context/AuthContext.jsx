import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  const login = async (inputs) => {
    const res = await axios.post(`${API_BASE_URL}/api/user/login`, inputs, { withCredentials: true });
    try {
      const userId = res.data.data;
      setCurrentUser(userId);
      navigate('/Product')
    } catch (err) {
      console.log(err)
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/user/logout`);
      setCurrentUser(null);
      navigate('/'); // Redirect to the home page or another appropriate route
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};