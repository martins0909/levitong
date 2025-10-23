import { assets } from "../../assets/assets";
import PropTypes from "prop-types";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast"; // ✅ Import toast

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const commentDate = new Date(createdAt);

  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm('Are you sure you want to delete this comment?');
    if (!confirm) return;

    try {
      const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b>: {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>: {name}
        <br />
        <b className="font-medium text-gray-600">Comment</b>: {content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        {commentDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        {commentDate.toLocaleTimeString()}
      </td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

CommentTableItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    blog: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isApproved: PropTypes.bool.isRequired,
  }).isRequired,
  fetchComments: PropTypes.func.isRequired,
};

export default CommentTableItem;
