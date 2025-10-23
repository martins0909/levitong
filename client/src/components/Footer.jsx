import { assets, footer_data } from "../assets/assets";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-100 dark:bg-gray-900">
      <div
        className="flex flex-col md:flex-row items-start justify-between gap-10
        py-10 border-b border-gray-500/30 text-gray-500 dark:text-gray-300"
      >
        {/* ✅ Logo + Intro */}
        <div>
          <img src={assets.levitonimage} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-6">
            Welcome to LEVITON Blog – your trusted source for news, tech
            insights, finance, educational content and more.
          </p>
        </div>

        {/* ✅ Footer Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 dark:text-white md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.url.startsWith("/") ? (
                      <Link
                        to={link.url}
                        className="hover:underline transition flex items-center gap-2"
                      >
                        {link.icon && (
                          <link.icon
                            size={16}
                            className="text-gray-600 dark:text-gray-300"
                          />
                        )}
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition flex items-center gap-2"
                      >
                        {link.icon && (
                          <link.icon
                            size={16}
                            className="text-gray-600 dark:text-gray-300"
                          />
                        )}
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Hidden Admin Login (not visible to normal users) */}
      <div className="hidden">
        <Link to="/admin/login">Admin Login</Link>
      </div>

      {/* ✅ Footer Bottom */}
      <div className="text-center py-4 text-sm md:text-base text-gray-500/80 dark:text-gray-400">
        <p>
          Copyright © {new Date().getFullYear()} LEVITON Blog — All Rights
          Reserved.{" "}
          |{" "}
          <Link
            to="/privacy-policy"
            className="text-blue-500 underline hover:text-primary transition"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
