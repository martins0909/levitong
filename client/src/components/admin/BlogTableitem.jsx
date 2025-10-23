import PropTypes from "prop-types"; // ✅ Import PropTypes
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();
 
  if (!blog) return null; // Early return if blog is not provided

  const { title, createdAt, isPublished, _id } = blog;
  const blogDate = new Date(createdAt);
 

  const deleteBlog = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/blog/delete", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p className={isPublished ? "text-green-600" : "text-orange-700"}>
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt="Delete"
          onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

// ✅ Prop Validation
BlogTableItem.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
  }).isRequired,
  fetchBlogs: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default BlogTableItem;
