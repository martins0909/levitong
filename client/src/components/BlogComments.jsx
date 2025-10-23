import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

// --- Comments Component for each Blog ---
const BlogComments = ({ blogId }) => {
  const [blogComments, setBlogComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // ✅ Correct endpoint & key
        const res = await axios.get(`http://localhost:3000/api/bcomments?blogId=${blogId}`);
        setBlogComments(res.data.comments || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [blogId]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post("http://localhost:3000/api/bcomments", {
        blogId,
        text: newComment,
      });

      // ✅ Use res.data.comment, not res.data
      if (res.data.success) {
        setBlogComments((prev) => [...prev, res.data.comment]);
        setNewComment("");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const visibleCount = visibleComments[blogId] || 2;

  return (
    <div className="mt-4">
      {blogComments.slice(0, visibleCount).map((comment) => (
        <div
          key={comment._id}
          className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1"
        >
          {comment.text}
        </div>
      ))}

      {blogComments.length > visibleCount && (
        <button
          onClick={() =>
            setVisibleComments((prev) => ({
              ...prev,
              [blogId]: visibleCount + 2,
            }))
          }
          className="text-xs text-indigo-500 hover:underline"
        >
          See more comments ↓
        </button>
      )}

      <div className="mt-2 flex items-center gap-2">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded-md p-1 text-sm"
        />
        <button
          onClick={handlePostComment}
          className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-md "
        >
          Post
        </button>
      </div>
    </div>
  );
};

// ✅ Fix ESLint prop validation warning (no UI or logic changes)
BlogComments.propTypes = {
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BlogComments;
