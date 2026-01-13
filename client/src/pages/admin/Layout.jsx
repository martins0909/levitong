import { Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  // ✅ Redirect to homepage if no token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
    }
  }, [navigate]);

  // Inject a noindex meta tag when admin layout mounts so search engines
  // don't index admin SPA routes. Clean up on unmount.
  useEffect(() => {
    if (typeof document === "undefined") return;
    let meta = document.querySelector('meta[name="robots"][data-admin-noindex]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      meta.setAttribute("content", "noindex, nofollow");
      meta.setAttribute("data-admin-noindex", "true");
      document.head.appendChild(meta);
    }

    return () => {
      try {
        const m = document.querySelector('meta[name="robots"][data-admin-noindex]');
        if (m) document.head.removeChild(m);
      } catch (e) {}
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null); // Clear token in context
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <img
          src={assets.levitonimage.png}
          alt=""
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
