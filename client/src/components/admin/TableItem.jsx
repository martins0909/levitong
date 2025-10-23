import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const TableItem = ({
  item,
  index,
  fetchItems,
  deleteEndpoint,
  togglePublishEndpoint,
  showPublish = false,
}) => {
  const { axios } = useAppContext();

  if (!item) return null;

  const { title, createdAt, isPublished, _id } = item;
  const itemDate = new Date(createdAt);

  const deleteItem = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post(deleteEndpoint, { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchItems();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    if (!togglePublishEndpoint) return;

    try {
      const { data } = await axios.post(togglePublishEndpoint, { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchItems();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{itemDate.toDateString()}</td>

      {showPublish && (
        <td className="px-2 py-4 max-sm:hidden">
          <p className={isPublished ? "text-green-600" : "text-orange-700"}>
            {isPublished ? "Published" : "Unpublished"}
          </p>
        </td>
      )}

      <td className="px-2 py-4 flex text-xs gap-3">
        {showPublish && (
          <button
            onClick={togglePublish}
            className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>
        )}

        <img
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt="Delete"
          onClick={deleteItem}
        />
      </td>
    </tr>
  );
};

TableItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  fetchItems: PropTypes.func.isRequired,
  deleteEndpoint: PropTypes.string.isRequired,
  togglePublishEndpoint: PropTypes.string,
  showPublish: PropTypes.bool,
};

export default TableItem;
