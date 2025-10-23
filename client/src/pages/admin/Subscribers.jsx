import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Subscribers = () => {
  const { axios } = useAppContext();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const { data } = await axios.get('/api/subscribers');
      if (data.success) {
        setSubscribers(data.subscribers);
      } else {
        toast.error(data.message || 'Failed to fetch subscribers');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="p-6 bg-blue-50/50 flex-1">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Subscriber List</h2>
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : subscribers.length > 0 ? (
              subscribers.map((sub, index) => (
                <tr key={sub._id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{sub.email}</td>
                  <td className="px-4 py-2">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscribers;
