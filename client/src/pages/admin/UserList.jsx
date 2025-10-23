import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Replace with your backend base URL
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/user`);
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => (u._id || u.id) !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (user) => {
    const userId = user._id || user.id; // ✅ normalize ID
    setEditingUser(userId);
    setEditForm({
      fullName: user.fullName,
      email: user.email || "",
      phone: user.phone,
      state: user.state,
      city: user.city,
    });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();

      if (data.success) {
        setUsers(users.map((u) => ((u._id || u.id) === id ? data.user : u)));
        setEditingUser(null);
        setMessage("✅ Done — User updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Registered Users</h2>

      {message && (
        <p className="mb-4 text-green-600 font-semibold">{message}</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2 min-w-[200px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u, i) => {
              const userId = u._id || u.id; // ✅ normalize ID
              return (
                <tr key={userId} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">
                    {editingUser === userId ? (
                      <input
                        type="text"
                        name="fullName"
                        value={editForm.fullName}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      u.fullName
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUser === userId ? (
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      u.email || "—"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUser === userId ? (
                      <input
                        type="text"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      u.phone
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUser === userId ? (
                      <input
                        type="text"
                        name="state"
                        value={editForm.state}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      u.state
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUser === userId ? (
                      <input
                        type="text"
                        name="city"
                        value={editForm.city}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      u.city
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {editingUser === userId ? (
                      <>
                        <button
                          onClick={() => handleUpdate(userId)}
                          className="bg-green-500 text-white px-3 py-1 rounded border-2 border-black"
                        >
                          ✅ Done
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(u)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(userId)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
