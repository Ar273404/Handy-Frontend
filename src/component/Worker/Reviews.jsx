import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../Api.jsx";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Fetch reviews from the server
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/worker/reviews`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setReviews(response.data.analyzedReviews);
          setFilteredReviews(response.data.analyzedReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleFilterChange = (type) => {
    setFilter(type);
    if (type === "all") {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(reviews.filter((review) => review.sentiment === type));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? "★" : "☆");
    }
    return stars.join(" ");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Worker Reviews
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["all", "positive", "neutral", "negative"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Reviews in Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review._id}
              className={`p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-105 ${
                review.sentiment === "positive"
                  ? "bg-green-50 border-green-300"
                  : review.sentiment === "neutral"
                  ? "bg-yellow-50 border-yellow-300"
                  : "bg-red-50 border-red-300"
              } border`}>
              {/* Avatar and Reviewer Name */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  {/* Replace with actual profile image if available */}
                  <span className="text-white text-xl">
                    {review.reviewerName.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">{review.reviewerName}</p>
                </div>
              </div>

              {/* Rating with Stars */}
              <div className="mb-4">
                <p className="text-yellow-500">{renderStars(review.rating)}</p>
              </div>

              {/* Review Comment in Quotes */}
              <p className="font-medium text-gray-700 mb-4">
                <span className="text-xl text-gray-600">"</span>
                {review.comment}
                <span className="text-xl text-gray-600">"</span>
              </p>

              {/* Rating and Sentiment */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    review.sentiment === "positive"
                      ? "bg-green-200 text-green-800"
                      : review.sentiment === "neutral"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}>
                  {review.sentiment.toUpperCase()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
