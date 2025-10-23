import { blogCategories } from "../assets/assets";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Blogcard from "./Blogcard";
import { useAppContext } from "../context/AppContext";

const Bloglist = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // Filter blogs based on search input
  const filteredBlogs = () => {
    if (!input.trim()) return blogs;
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  const displayedBlogs = filteredBlogs().filter((blog) =>
    menu === "All" ? true : blog.category === menu
  );

  return (
    <div className="mb-24">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 my-10 relative">
        {blogCategories.map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`relative px-5 py-2 text-sm rounded-full transition-all duration-300 ${
              menu === item
                ? "bg-primary text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mx-6 sm:mx-12 xl:mx-32"
        >
          {displayedBlogs.length > 0 ? (
            displayedBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Blogcard blog={blog} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-16"
            >
              <p className="text-lg text-gray-500">
                😔 No blogs found. Try a different search or category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Bloglist;
