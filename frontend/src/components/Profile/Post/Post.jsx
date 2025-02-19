import { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../../../Hooks/api/api";

Modal.setAppElement("#root"); // Ensure modal works correctly

const Post = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Keep track of category by id
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories from Django when modal opens
  useEffect(() => {
    if (modalIsOpen) {
      api
        .get("/posts/categories/")
        .then((response) => setCategories(response.data.categories))
        .catch((error) => console.error("Error fetching categories:", error));
    }
  }, [modalIsOpen]);

  // Handle Image Upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category); // Ensure category is sent as the id

    try {
      await api.post("/posts/create/", formData);
      setModalIsOpen(false);
      setImage(null);
      setTitle("");
      setDescription("");
      setCategory(""); // Reset category state after submit
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Failed to upload post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white text-black font-mono">
      <div className="bg-white text-black font-mono">
        <div className="border border-black flex items-center justify-center">
          <h2 className="text-2xl">Post</h2>
        </div>
      </div>
      <div className="bg-white text-black font-mono">
        <div className="border-black flex items-end justify-end">
          <button
            className="font-thin border p-2 bg-black text-white hover:bg-zinc-500"
            onClick={() => setModalIsOpen(true)}
          >
            Upload
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-5 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-bold mb-3">Upload Picture</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {/* Title */}
            <input
              type="text"
              className="border p-2 rounded"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Description */}
            <textarea
              className="border p-2 rounded"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Category Dropdown */}
            <select
              className="border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                // Use cat.id as the value for the category select field
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-black text-white p-2 rounded hover:bg-zinc-500"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default Post;
