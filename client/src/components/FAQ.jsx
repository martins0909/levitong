import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "This platform provides tutorials, updates, and resources to help students and professionals learn effectively.",
  },
  {
    question: "How do I create an account?",
    answer:
      "You can sign up using your full name, email, phone, state, and city. Once registered, you’ll have access to all features.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, all passwords are encrypted and your personal information is protected using industry-standard practices.",
  },
  {
    question: "Can I reset my password?",
    answer:
      "Yes, you can reset your password anytime by using the 'Forgot Password' option on the sign-in page.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Find quick answers to the most common questions.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg text-gray-800"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <ChevronDown
                  className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 border-t bg-gray-50 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
