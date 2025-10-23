import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import BlogComments from "../components/BlogComments";

const BlogDetails = () => {
  const { id } = useParams();
  const { axios } = useAppContext(); // ✅ uses app-level axios instance
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blog/${id}`);
        if (res.data.success) {
          setBlog(res.data.blog);
        } else {
          console.error("Error:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id, axios]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <Link to="/blog" className="text-indigo-600 hover:underline">
          ← Back to Blogs
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
          {blog.title}
        </h1>

        <p className="text-gray-700 mb-6">{blog.content}</p>

        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          💬 Comments
        </h3>

        {/* ✅ Main blog comment section */}
        <BlogComments blogId={id} />
      </div>
    </div>
  );
};

export default BlogDetails;
