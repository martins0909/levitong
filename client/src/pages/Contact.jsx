import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_68086gu",
        "template_4oy0y12",
        form.current,
        "3PXbjKkiRNnJzskrH"
      )
      .then(
        () => {
          setLoading(false);
          setSuccess("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          setLoading(false);
          setSuccess("❌ Failed to send message. Please try again.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white px-6 md:px-16 lg:px-24 xl:px-32 py-16">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Contact Leviton Admin</h1>
      <p className="text-gray-300 max-w-xl mb-10">
        Have questions, feedback, or need support? Fill out the form below or reach us through our contact details. 
        We’d love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-200">Name</label>
              <input 
                type="text" 
                name="from_name"
                placeholder="Your full name"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Email</label>
              <input 
                type="email" 
                name="reply_to"
                placeholder="Your email address"
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">Message</label>
              <textarea 
                rows="4" 
                name="message"
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-2 border border-gray-600 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-center mt-3 text-sm text-gray-200">{success}</p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-400" />
            <p className="text-gray-200">mail@leviton.com.ng</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-blue-400" />
            <p className="text-gray-200">+234 806 811 2534</p>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-400" />
            <p className="text-gray-200">Lagos</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 text-pink-500 hover:text-white transition" />
              </a>
              <a href="https://twitter.com/LEVITONG1_" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6 text-blue-400 hover:text-white transition" />
              </a>
              <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 text-blue-600 hover:text-white transition" />
              </a>
              <a href="https://youtube.com/@levitongtutorial" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6 text-red-500 hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
