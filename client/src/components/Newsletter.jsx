import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/subscribe", { email });

      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message || "Subscription failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center text-center my-32 px-6">
      {/* Heading */}
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">
        Stay Updated. <span className="text-primary">Subscribe Now!</span>
      </h1>
      <p className="mt-3 md:text-lg text-gray-500 max-w-xl">
        Get the latest blogs, tech insights, and exclusive updates directly to
        your inbox.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubscribe}
        className="flex w-full max-w-xl mt-8 rounded-full overflow-hidden shadow-md border border-gray-200 focus-within:ring-2 focus-within:ring-primary/40"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-3 text-gray-700 outline-none text-sm md:text-base"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="px-6 md:px-10 bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:opacity-90 transition-all"
        >
          Subscribe
        </button>
      </form>

      {/* Small note */}
      <p className="mt-4 text-xs text-gray-400">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </section>
  );
};

export default Newsletter;
