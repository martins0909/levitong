import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BblogComments from "../components/BblogComments"; // ✅ correct tutorial comments component
import AdSenseAd from "../components/AdSenseAd";

const BblogDetails = () => {
  const { id } = useParams();
  const [bblog, setBblog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBblog = async () => {
      try {
        const res = await fetch(`/api/bblogs/${id}`);
        const data = await res.json();

        if (!data.success) {
          setError(data.message || "No blog found");
          return;
        }

        setBblog(data.blog);
      } catch {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBblog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <Link to="/dashboard" className="text-indigo-600 hover:underline">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-gray-800">{bblog.title}</h1>

        {bblog.author && (
          <p className="text-sm text-gray-500 mb-2">By {bblog.author}</p>
        )}

        <p className="text-gray-700 mb-4 leading-relaxed">{bblog.content}</p>

        {/* AdSense ad (replace adSlot with your unit id) */}
        <AdSenseAd adSlot="REPLACE_WITH_AD_SLOT" />

        <h3 className="text-lg font-semibold mb-3 text-gray-800">💬 Comments</h3>

        {/* tutorial comments (bcomments) */}
        <BblogComments blogId={bblog._id} />
      </div>
    </div>
  );
};

export default BblogDetails;
