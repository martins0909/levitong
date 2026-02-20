
import {  Smartphone, Megaphone, Video, Lightbulb, BookOpen, Shield, PenTool, Newspaper, Zap } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const services = [
  {
    title: "Web & Mobile App Development",
    description: "Custom websites and mobile apps built to scale, optimized for speed, security, and user experience.",
    icon: <Smartphone className="w-10 h-10 text-blue-500" />,
  },
  {
    title: "Digital Marketing",
    description: "Grow your brand online with targeted SEO, social media campaigns, and performance-driven strategies.",
    icon: <Megaphone className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Video Editing & Coverage",
    description: "Professional video production and editing services for events, brands, and digital storytelling.",
    icon: <Video className="w-10 h-10 text-red-500" />,
  },
  {
    title: "IT Consulting",
    description: "Expert advice and tailored IT solutions to help businesses leverage technology effectively.",
    icon: <Lightbulb className="w-10 h-10 text-yellow-500" />,
  },
  {
    title: "WAEC / NECO / JAMB Online Teachings",
    description: "Comprehensive e-learning support with quality study materials, live classes, and exam prep.",
    icon: <BookOpen className="w-10 h-10 text-purple-500" />,
  },
  {
    title: "Cybersecurity",
    description: "Protect your business with security audits, threat detection, and data protection strategies.",
    icon: <Shield className="w-10 h-10 text-indigo-500" />,
  },
  {
    title: "Graphics & Logo Design",
    description: "Creative and modern designs that capture your brand’s identity and leave lasting impressions.",
    icon: <PenTool className="w-10 h-10 text-pink-500" />,
  },
  {
    title: "News & Media",
    description: "Stay updated with reliable, timely, and engaging news coverage across different sectors.",
    icon: <Newspaper className="w-10 h-10 text-gray-500" />,
  },
  {
    title: "Electrical & Solar Services",
    description: "Professional electrical installations, maintenance, and sustainable solar energy solutions.",
    icon: <Zap className="w-10 h-10 text-orange-500" />,
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50 relative">
      <button 
        onClick={() => navigate('/')} 
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:bg-blue-700 transition duration-300">
        Home
      </button>

      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
