import { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchCategories, uploadPost } from "../../../Hooks/api/api";

Modal.setAppElement("#root"); // Ensure modal works correctly

const Post = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories from API when modal opens
  useEffect(() => {
    if (modalIsOpen) {
      fetchCategories()
        .then(setCategories)
        .catch(() => alert("Failed to load categories."));
    }
  }, [modalIsOpen]);

  // Handle Image Upload
  const handleImageChange = (e) => {
    if (e.target.files?.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image.");

    setLoading(true);
    try {
      await uploadPost(image, title, description, category);
      setModalIsOpen(false);
      setImage(null);
      setTitle("");
      setDescription("");
      setCategory("");
    } catch {
      alert("Failed to upload post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white text-black font-mono">
      <div className="border border-black flex items-center justify-center">
        <h2 className="text-2xl">Post</h2>
      </div>

      <div className="flex items-end justify-end">
        <button
          className="font-thin border p-2 bg-black text-white hover:bg-zinc-500"
          onClick={() => setModalIsOpen(true)}
        >
          Upload
        </button>
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
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <input
              type="text"
              className="border p-2 rounded"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border p-2 rounded"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className="border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

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
