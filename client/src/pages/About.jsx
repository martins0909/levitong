
import React from 'react';
import { useNavigate } from 'react-router-dom';
import myPhoto from "../assets/myphoto.jpg";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen relative">
      <button 
        onClick={() => navigate('/')} 
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:bg-blue-700 transition duration-300">
        Home
      </button>

      {/* Hero Banner */}
      <div
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?team,technology')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Driving growth and success by fostering innovation, creativity, collaboration, knowledge, and education
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Section 1 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Founded with a vision to make technology, education, 
            and information easily accessible, our platform is built on the belief that
             innovation and knowledge should empower people. Over time, we have grown 
             into a trusted hub where users connect, share ideas, and achieve more 
             through the tools and resources we provide..
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Our mission is to deliver seamless digital solutions that enhance productivity, 
            collaboration, creativity and we share ideas and news on current issues. We’re dedicated to building products that are 
            intuitive, secure, and impactful — helping individuals and businesses thrive 
            in a fast-moving world.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
            <li><span className="font-medium">Innovation:</span> We embrace creativity and forward-thinking ideas.</li>
            <li><span className="font-medium">Integrity:</span> We act with honesty and transparency.</li>
            <li><span className="font-medium">Excellence:</span> We strive for the highest standards in everything we do.</li>
            <li><span className="font-medium">Community:</span> We believe in collaboration and inclusivity.</li>
          </ul>
        </div>

        {/* Section 4 - Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Meet the Team</h2>
          <p className="text-sm sm:text-base leading-relaxed mb-4">
            Behind every project is a passionate team of developers, designers, and thinkers. 
            We work together to bring innovative solutions to life, focusing on user experience 
            and meaningful results.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                  <img
                    src={myPhoto}
                    alt="Madueke Martins"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium">Madueke Martins</p>
                <p className="text-xs text-gray-500">CEO</p>
              </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 mb-2"></div>
              <p className="text-sm font-medium">aka Leviton G</p>
              <p className="text-xs text-gray-500">Lead Developer</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Want to Work With Us?
          </h2>
          <p className="text-sm sm:text-base mb-6">
            Whether you’re a user with feedback or a business looking to collaborate, 
            we’d love to hear from you.
          </p>
          <a
            href="/contact"
            className="bg-primary text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
