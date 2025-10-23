import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";  // ✅ Import useParams

const steps = ["Placed", "Shipped", "Out for Delivery", "Delivered"];

const TrackOrder = () => {
  const { orderId } = useParams();   // ✅ Get orderId from URL
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);
        const data = await res.json();
        if (data.status) {
          setCurrentStep(steps.indexOf(data.status));
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (orderId) {
      fetchStatus();
      const interval = setInterval(fetchStatus, 10000);
      return () => clearInterval(interval);
    }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-8">Track Your Order</h2>
      <p className="mb-6 text-gray-600">Order ID: {orderId}</p> {/* ✅ Show orderId */}

      <div className="flex items-center w-full max-w-2xl">
        {steps.map((step, index) => (
          <div key={step} className="flex-1 relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: index <= currentStep ? 1 : 0.8,
                opacity: index <= currentStep ? 1 : 0.4,
              }}
              transition={{ duration: 0.5 }}
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                index <= currentStep
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-200 border-gray-300"
              }`}
            >
              {index + 1}
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: index <= currentStep ? 1 : 0.5, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-2 text-sm font-medium"
            >
              {step}
            </motion.span>

            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full">
                <div
                  className={`h-1 w-full ${
                    index < currentStep ? "bg-primary" : "bg-gray-300"
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
