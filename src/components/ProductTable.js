import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productsApi";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ProductTable = () => {
  const [page, setPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductReviews, setSelectedProductReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [error, setError] = useState("");
  const [sortColumn, setSortColumn] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(page, sortColumn, sortOrder);
        console.log("Fetched Data:", data);
        setProducts(data.products || []);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response || error.message
        );
        setError("Error fetching products.");
      }
    };

    fetchProducts();
  }, [page, sortColumn, sortOrder]);

  const handleViewReviews = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      // Set an empty array if reviews are not available
      setSelectedProductReviews(product.reviews || []);
      const avgRating = calculateAverageRating(product.reviews || []);
      setAverageRating(avgRating);
      setSelectedProductId(productId);
      setIsModalOpen(true);
    } else {
      setError("Product not found.");
    }
  };
  // modal close handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
    setSelectedProductReviews([]);
    setAverageRating(0);
  };

  // calculate rating function
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };
  // icons based on sorting
  const sortIcons = {
    asc: <FontAwesomeIcon icon={faArrowUp} />,
    desc: <FontAwesomeIcon icon={faArrowDown} />,
  };
  // sorting
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="p-4 container overflow-x-auto mx-auto">
      {error && <div className="text-red-500">{error}</div>}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              Product Image {sortColumn === "id" && sortIcons[sortOrder]}
            </th>
            <th
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => handleSort("title")}
            >
              Product Name {sortColumn === "title" && sortIcons[sortOrder]}
            </th>
            <th
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => handleSort("brand")}
            >
              Brand {sortColumn === "brand" && sortIcons[sortOrder]}
            </th>
            <th
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => handleSort("category")}
            >
              Category {sortColumn === "category" && sortIcons[sortOrder]}
            </th>
            <th
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price {sortColumn === "price" && sortIcons[sortOrder]}
            </th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 items-center">
                <img
                  src={product.images[0]}
                  alt="Product"
                  className="w-16 h-16 mx-auto"
                />
              </td>
              <td className="border border-gray-300 p-2">{product.title}</td>
              <td className="border border-gray-300 p-2">
                {product.brand || "No Brand"}
              </td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleViewReviews(product.id)}
                  className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                  View Reviews
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span className="p-2 bg-gray-700 text-white rounded-lg px-3">
          {page}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={products.length < 10}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Modal for reviews */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reviews={selectedProductReviews}
        averageRating={averageRating}
      />
    </div>
  );
};

export default ProductTable;
