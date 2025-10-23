import { useState } from "react";

const API_BASE_URL = "http://localhost:3000";

const AdminDashboard = () => {
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [material, setMaterial] = useState({ title: "", description: "", fileUrl: "" });
  const [update, setUpdate] = useState({ title: "", content: "" });

  const handleSubmit = async (endpoint, data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) alert("✅ Uploaded successfully!");
      else alert("❌ Upload failed");
    } catch (err) {
      console.error(err);
      alert("Error uploading");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-10">
      <h1 className="text-3xl font-bold text-center mb-6">🧑‍🏫 Admin Dashboard</h1>

      {/* Blog Form */}
      <section className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">📘 Post Tutorial Blog</h2>
        <input
          type="text"
          placeholder="Blog Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Blog Content"
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={() => handleSubmit("blog", blog)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Post Blog
        </button>
      </section>

      {/* Material Upload */}
      <section className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">📂 Upload Teaching Material</h2>
        <input
          type="text"
          placeholder="Title"
          value={material.title}
          onChange={(e) => setMaterial({ ...material, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={material.description}
          onChange={(e) => setMaterial({ ...material, description: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="File URL"
          value={material.fileUrl}
          onChange={(e) => setMaterial({ ...material, fileUrl: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={() => handleSubmit("materials", material)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload Material
        </button>
      </section>

      {/* Student Updates */}
      <section className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">🔔 Write Student Update</h2>
        <input
          type="text"
          placeholder="Update Title"
          value={update.title}
          onChange={(e) => setUpdate({ ...update, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Update Content"
          value={update.content}
          onChange={(e) => setUpdate({ ...update, content: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={() => handleSubmit("updates", update)}
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          Post Update
        </button>
      </section>
    </div>
  );
};

export default AdminDashboard;
