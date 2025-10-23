import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import Moment from "moment";
import Footer from "../components/Footer"; // ✅ corrected capitalization (your file was `footer.js`)
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");

  // ✅ Fetch the blog post
  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      res.data.success ? setData(res.data.blog) : toast.error(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/blog/comment?blogId=${id}`);
      res.data.success
        ? setComments(res.data.comments)
        : toast.error(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Add a new comment
  const addComments = async (e) => {
    e.preventDefault();
    if (!name.trim() || !contents.trim()) {
      toast.error("Name and comment are required.");
      return;
    }

    try {
      const res = await axios.post("/api/blog/add-comment", {
        blog: id, // ✅ backend expects "blog"
        name,
        content: contents,
      });

      if (res.data.success) {
        toast.success("Comment added!");
        setComments((prev) => [...prev, res.data.comment]);
        setName("");
        setContents("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className="relative">
      {/* Background */}
      <img
        src={assets.gradientBackground}
        alt="background"
        className="absolute -top-10 -z-10 opacity-50 w-full"
      />

      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMM Do YYYY")}
        </p>
        <h1 className="my-5 max-w-lg mx-auto text-xl font-semibold">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          LEVITON G
        </p>
      </div>

      {/* Blog Content */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt={data.title} className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={item._id || index}
                className="relative bg-primary/10 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="user" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm ml-8">{item.content}</p>
                <p className="text-xs text-right text-gray-400 mt-1">
                  {Moment(item.createdAt).format("MMM Do YYYY, h:mm a")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComments}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              onChange={(e) => setContents(e.target.value)}
              value={contents}
              placeholder="Comment"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none h-28 resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-4 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Section */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">Share this article</p>
          <div className="flex gap-4">
            <img src={assets.facebook_icon} width={40} alt="facebook" />
            <img src={assets.twitter_icon} width={40} alt="twitter" />
            <img src={assets.googleplus_icon} width={40} alt="google plus" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
