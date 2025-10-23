import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ✅ Set the base URL for axios (make sure VITE_BASE_URL is defined in .env)
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

// Create context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Fetch Blogs Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    // Load blogs
    fetchBlogs();

    // ✅ Check for token in localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs, // ✅ expose fetchBlogs so components can refresh manually
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Export hook for using context
export const useAppContext = () => useContext(AppContext);
