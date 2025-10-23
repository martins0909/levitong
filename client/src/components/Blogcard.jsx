import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Blogcard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="group w-full rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Blog Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-primary/90 text-white text-xs rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Blog Content */}
      <div className="p-5">
        <h5 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h5>
        <p
          className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 140) + "...",
          }}
        />
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
        <p>✍️ By Admin</p>
        <button className="text-primary font-medium hover:underline">
          Read More →
        </button>
      </div>
    </div>
  );
};

// ✅ PropTypes validation
Blogcard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blogcard;
