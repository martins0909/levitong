import React from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const TableItem = ({ item, fetchItems, index, deleteEndpoint }) => {
  const { axios } = useAppContext();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${deleteEndpoint}/${item._id}`);
      toast.success("Deleted successfully!");
      fetchItems(); // refresh table after delete
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-b bg-white hover:bg-gray-50 transition-all">
      <td className="px-2 py-4 text-gray-600">{index}</td>
      <td className="px-2 py-4 font-medium text-gray-700">{item.title}</td>
      <td className="px-2 py-4 text-sm text-gray-500">
        {new Date(item.createdAt).toLocaleDateString()}
      </td>
      <td className="px-2 py-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

TableItem.propTypes = {
  item: PropTypes.object.isRequired,
  fetchItems: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  deleteEndpoint: PropTypes.string.isRequired,
};

export default TableItem;
