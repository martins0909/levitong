import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const BblogComments = ({ blogId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  // ✅ Fetch comments when component loads or blogId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // ✅ Changed to match Express route: /api/bcomments/:blogId
        const res = await axios.get(`/api/bcomments/${blogId}`);
        setComments(res.data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error.response?.data || error);
      }
    };

    if (blogId) fetchComments();
  }, [blogId]);

  // ✅ Handle new comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/bcomments", {
        text,
        blogId,
      });

      // ✅ Update comment list immediately after posting
      setComments((prev) => [...prev, res.data.comment]);
      setText("");
    } catch (error) {
      console.error("Error posting bcomment:", error.response?.data || error);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Post Comment
        </button>
      </form>

      <ul>
        {comments.length > 0 ? (
          comments.map((c) => (
            <li key={c._id} className="border-b py-2 text-gray-700">
              {c.text}
            </li>
          ))
        ) : (
          <p className="text-gray-500 italic">No comments yet.</p>
        )}
      </ul>
    </div>
  );
};

BblogComments.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default BblogComments;
