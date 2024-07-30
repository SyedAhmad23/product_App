import React from "react";

const Modal = ({ isOpen, onClose, reviews, averageRating }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold ">
            Product Reviews (Average Rating: {averageRating.toFixed(1)})
          </h2>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
          >
            x
          </button>
        </div>

        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded shadow-sm">
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-gray-600">Rating: {review.rating} / 5</p>
                <p className="mt-2">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
