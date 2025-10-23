// PrivacyPolicy.jsx

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-500 mb-10">
          <strong>Effective Date:</strong> June 17, 2025
        </p>

        {/* Intro */}
        <p className="text-gray-700 leading-7 mb-6">
          At <strong className="text-indigo-600">LEVITON Blog</strong>, accessible from 
          <span className="text-indigo-500"> leviton.com.ng</span>, your privacy is one of our 
          top priorities. This Privacy Policy outlines the types of information we collect and how 
          we use it.
        </p>

        {/* Sections */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-700">
              We may collect personal information including your name, email address, IP address, 
              browser type, and browsing behavior. This information may be collected through comment 
              forms or automatically via cookies and similar technologies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>To personalize user experience</li>
              <li>To improve our website</li>
              <li>To respond to inquiries or feedback</li>
              <li>To serve personalized advertisements via Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              3. Google AdSense & Cookies
            </h2>
            <p className="text-gray-700">
              We use Google AdSense to display ads. Google may use cookies to serve ads based on your 
              previous visits to our website and others. You can opt out of personalized ads by visiting{" "}
              <a 
                href="https://www.google.com/settings/ads" 
                className="text-blue-600 underline hover:text-blue-800" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>.
            </p>
            <p className="mt-2 text-gray-700">
              For more details, refer to{" "}
              <a 
                href="https://policies.google.com/technologies/ads" 
                className="text-blue-600 underline hover:text-blue-800" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Google’s Advertising Privacy & Terms
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              4. Cookies
            </h2>
            <p className="text-gray-700">
              Cookies are small files stored on your device to enhance your experience. You can 
              disable cookies through your browser settings. However, this may affect some features 
              of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              5. Third-Party Links
            </h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites. We are not responsible for their 
              privacy practices. Please review their privacy policies before providing any personal 
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              6. Data Protection Rights
            </h2>
            <p className="text-gray-700">
              Depending on your region (e.g., EU or California), you may have the right to access, 
              correct, or delete your data. To exercise these rights, please contact us using the 
              information below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              7. Children’s Information
            </h2>
            <p className="text-gray-700">
              We do not knowingly collect personal information from children under 13. If you believe 
              a child has submitted information to us, please contact us, and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. Updates will be posted on this page 
              with a revised Effective Date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              9. Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, contact us at:
            </p>
            <p className="mt-2 text-gray-800 font-medium">
              <strong>Email:</strong> mail@leviton.com.ng or leviton.com.ng@gmail.com <br />
              <strong>Website:</strong>{" "}
              <a 
                href="https://leviton.com.ng" 
                className="text-blue-600 underline hover:text-blue-800"
              >
                https://leviton.com.ng
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
