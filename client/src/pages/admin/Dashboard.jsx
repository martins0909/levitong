import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import TableItem from "../../components/admin/TableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const Dashboard = () => {
  const [dashboardData, setDashboard] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    subscribers: 0,
    recentBlogs: [],
  });

  const [bblogs, setBblogs] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [BblogForm, setBblogForm] = useState({
    title: "",
    content: "",
    category: "tutorial",
  });
  const [materialForm, setMaterialForm] = useState({
    title: "",
    fileUrl: "",
  });
  const [updateForm, setUpdateForm] = useState({
    title: "",
    content: "",
  });

  const { axios } = useAppContext();

  // ✅ Fetch dashboard summary
  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) setDashboard(data.dashboardData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Fetch tutorial blogs
  const fetchBblogs = async () => {
    try {
      const { data } = await axios.get("/api/bblogs");
      if (data.success) setBblogs(data.bblogs || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Fetch materials
  const fetchMaterials = async () => {
    try {
      const { data } = await axios.get("/api/bmaterials");
      if (data.success) setMaterials(data.bmaterials || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Fetch updates
  const fetchUpdates = async () => {
    try {
      const { data } = await axios.get("/api/updates");
      if (data.success) setUpdates(data.updates || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchBblogs();
    fetchMaterials();
    fetchUpdates();
  }, []);

  // ✅ Upload handler
  const handleUpload = async (endpoint, payload, refetch) => {
    try {
      const { data } = await axios.post(endpoint, payload);
      if (data.success) {
        toast.success("✅ Uploaded successfully!");
        refetch();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* --- Dashboard cards --- */}
      <div className="flex flex-wrap gap-4">
        {[
          { label: "Blogs", value: dashboardData.blogs, icon: assets.dashboard_icon_1 },
          { label: "Comments", value: dashboardData.comments, icon: assets.dashboard_icon_2 },
          { label: "Drafts", value: dashboardData.drafts, icon: assets.dashboard_icon_3 },
          { label: "Subscribers", value: dashboardData.subscribers, icon: assets.dashboard_icon_3 },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all"
          >
            <img src={item.icon} alt={item.label} />
            <div>
              <p className="text-xl font-semibold text-gray-600">{item.value}</p>
              <p className="text-gray-400 font-light">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Latest Blogs --- */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th className="px-2 py-4 xl:px-6">#</th>
                <th className="px-2 py-4">Blog Title</th>
                <th className="px-2 py-4 max-sm:hidden">Dates</th>
                <th className="px-2 py-4 max-sm:hidden">Status</th>
                <th className="px-2 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Tutorial Blog Section --- */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-10 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Tutorial Classes & Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th className="px-2 py-4 xl:px-6">#</th>
                <th className="px-2 py-4">Blog Title</th>
                <th className="px-2 py-4 max-sm:hidden">Dates</th>
                <th className="px-2 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {bblogs.length > 0 ? (
                bblogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td colSpan="4" className="p-0">
                      <TableItem
                        item={blog}
                        fetchItems={fetchBblogs}
                        index={index + 1}
                        deleteEndpoint="/api/bblogs"
                      />
                      <div className="p-4 bg-gray-50 border-t">
                        <BlogComments blogId={blog._id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">
                    No tutorial blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Upload Section --- */}
      <div className="mt-10 bg-white rounded-xl shadow-lg p-6 space-y-10">
        <h2 className="text-2xl font-semibold text-gray-700">📤 Upload Content</h2>

        {/* Tutorial Blog Upload */}
        <section>
          <h3 className="text-lg font-bold mb-3">Tutorial Blog</h3>
          <input
            type="text"
            placeholder="Blog Title"
            value={BblogForm.title}
            onChange={(e) => setBblogForm({ ...BblogForm, title: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <textarea
            placeholder="Blog Content"
            value={BblogForm.content}
            onChange={(e) => setBblogForm({ ...BblogForm, content: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            rows="4"
          />
          <button
            onClick={() => handleUpload("/api/bblogs", BblogForm, fetchBblogs)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
          >
            Upload Tutorial Blog
          </button>
        </section>

        {/* Teaching Material Upload */}
        <section>
          <h3 className="text-lg font-bold mb-3">Teaching Materials</h3>
          <input
            type="text"
            placeholder="Title"
            value={materialForm.title}
            onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="text"
            placeholder="File URL (Google Drive Link)"
            value={materialForm.fileUrl}
            onChange={(e) => setMaterialForm({ ...materialForm, fileUrl: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <button
            onClick={() => handleUpload("/api/bmaterials", materialForm, fetchMaterials)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
          >
            Upload Material
          </button>

          {materials.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Uploaded Materials</h4>
              <div className="overflow-x-auto shadow rounded-lg bg-white">
                <table className="w-full text-sm text-gray-500">
                  <thead className="text-xs text-gray-600 text-left uppercase">
                    <tr>
                      <th className="px-2 py-4">#</th>
                      <th className="px-2 py-4">Title</th>
                      <th className="px-2 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material, index) => (
                      <TableItem
                        key={material._id}
                        item={material}
                        fetchItems={fetchMaterials}
                        index={index + 1}
                        deleteEndpoint="/api/bmaterials"
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Student Updates Upload */}
        <section>
          <h3 className="text-lg font-bold mb-3">Student Updates</h3>
          <input
            type="text"
            placeholder="Update Title"
            value={updateForm.title}
            onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <textarea
            placeholder="Update Content"
            value={updateForm.content}
            onChange={(e) => setUpdateForm({ ...updateForm, content: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            rows="3"
          />
          <button
            onClick={() => handleUpload("/api/updates", updateForm, fetchUpdates)}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 cursor-pointer"
          >
            Post Update
          </button>

          {updates.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Recent Updates</h4>
              <div className="overflow-x-auto shadow rounded-lg bg-white">
                <table className="w-full text-sm text-gray-500">
                  <thead className="text-xs text-gray-600 text-left uppercase">
                    <tr>
                      <th className="px-2 py-4">#</th>
                      <th className="px-2 py-4">Title</th>
                      <th className="px-2 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {updates.map((update, index) => (
                      <TableItem
                        key={update._id}
                        item={update}
                        fetchItems={fetchUpdates}
                        index={index + 1}
                        deleteEndpoint="/api/updates"
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// --- Blog Comments Component ---
const BlogComments = ({ blogId }) => {
  const { axios } = useAppContext();
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/bcomments?blogId=${blogId}`);
      if (data.success) setComments(data.bcomments || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bcomments/${id}`);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-gray-700">Comments</h4>
      {comments.length > 0 ? (
        comments.map((c) => (
          <div
            key={c._id}
            className="flex justify-between items-center bg-white p-2 rounded shadow-sm border"
          >
            <span className="text-gray-700 text-sm">
              <strong>{c.author}:</strong> {c.content}
            </span>
            <button
              onClick={() => handleDelete(c._id)}
              className="text-xs text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">No comments yet.</p>
      )}
    </div>
  );
};

BlogComments.propTypes = {
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Dashboard;
