import { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[70vh] flex flex-col justify-center items-center px-6 sm:px-16 xl:px-24">
      {/* Gradient background overlay */}
      <img
        src={assets.gradientBackground}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 -z-10"
      />

      {/* Announcement Banner */}
      <div className="inline-flex items-center justify-center gap-3 px-6 py-2 mb-6 border border-primary/30 bg-primary/10 rounded-full text-sm shadow-sm">
        <p className="text-gray-700 dark:text-gray-200">🚀 Be updated at every moment</p>
        <img src={assets.star_icon} className="w-3" alt="star" />
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-white text-center leading-snug">
        We &apos;re <span className="text-primary">Leviton.</span> <br /> Welcome
      </h1>

      {/* Subtitle */}
      <p className="mt-6 sm:mt-8 max-w-2xl text-center text-gray-600 dark:text-gray-300 text-base sm:text-lg">
        This is your space to think out loud, to share what matters, and to
        write without filters. Whether it’s one word or a thousand, your story
        starts right here.
      </p>

      {/* Search Bar */}
      <form
        onSubmit={onSubmitHandler}
        className="flex justify-between items-center max-w-lg w-full mt-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for blogs..."
          required
          className="w-full pl-4 py-3 bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 sm:px-8 py-3 font-medium rounded-r-lg hover:scale-105 transition-all cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Clear Button */}
      {input && (
        <div className="mt-4">
          <button
            onClick={onClear}
            className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs py-2 px-4 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
