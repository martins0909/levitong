import { useEffect, useState } from "react";
import BblogComments from "../components/BblogComments";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";


const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [expandedBlog, setExpandedBlog] = useState(null);

  useEffect(() => {
    // ✅ Fetch tutorial blogs
    fetch(`${API_BASE_URL}/api/bblogs?category=tutorial`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.bblogs || []));

    // ✅ Fetch materials
    fetch(`${API_BASE_URL}/api/bmaterials`)
      .then((res) => res.json())
      .then((data) => setMaterials(data.bmaterials || []));

    // ✅ Fetch updates
    fetch(`${API_BASE_URL}/api/updates`)
      .then((res) => res.json())
      .then((data) => setUpdates(data.updates || []));
  }, []);

  const toggleExpand = (id) => {
    setExpandedBlog(expandedBlog === id ? null : id);
  };

  const handleDownload = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = title || "material";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8">
      {/* ✅ Custom animation styles */}
      <style>
        {`
          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-slide {
            animation: fadeSlide 0.5s ease-in-out;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center text-white mb-10">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">
            🎓 Student Dashboard
          </h1>
          <p className="mt-2 text-lg opacity-90">
            Access tutorials, materials, and latest updates in one place.
          </p>
        </header>

        {/* 🟦 Tutorials Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            📘 Tutorial Classes & Blogs
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.length === 0 ? (
              <p className="text-white opacity-80">
                No tutorial blogs available.
              </p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {blog.title}
                  </h3>

                  {/* ✅ Animated expanding text */}
                  <div
                    className={`text-gray-600 mb-3 overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedBlog === blog._id
                        ? "max-h-[600px] opacity-100 fade-slide"
                        : "max-h-[80px] opacity-80"
                    }`}
                  >
                    {blog.content}
                  </div>

                  <button
                    onClick={() => toggleExpand(blog._id)}
                    className="text-indigo-600 font-semibold hover:underline focus:outline-none"
                  >
                    {expandedBlog === blog._id ? "Show less ↑" : "See more ↓"}
                  </button>

                  <BblogComments blogId={blog._id} />
                </div>
              ))
            )}
          </div>
        </section>

        {/* 🟩 Teaching Materials Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            📂 Teaching Materials
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {materials.length === 0 ? (
              <p className="text-white opacity-80">
                No teaching materials uploaded yet.
              </p>
            ) : (
              materials.map((mat) => (
                <div
                  key={mat._id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {mat.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {mat.description || "Material description"}
                  </p>
                  {mat.fileUrl && (
                    <button
                      onClick={() => handleDownload(mat.fileUrl, mat.title)}
                      className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                    >
                      📥 View / Download
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* 🟧 Student Updates Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            🔔 Student Updates
          </h2>
          <div className="space-y-6">
            {updates.length === 0 ? (
              <p className="text-white opacity-80">No updates available.</p>
            ) : (
              updates.map((update) => (
                <div
                  key={update._id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {update.title}
                  </h3>
                  <p className="text-gray-600">{update.content}</p>
                  <span className="block mt-2 text-sm text-gray-400">
                    {new Date(update.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
