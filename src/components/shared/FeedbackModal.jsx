import React, { useState } from "react";

/**
 * FeedbackModal component for collecting user feedback
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback when modal is closed
 * @returns {JSX.Element}
 */
const FeedbackModal = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // In production, this would send to your backend/analytics
    console.log("Feedback submitted:", { feedback, rating, email });

    // Store feedback in localStorage for now
    const feedbackData = {
      feedback,
      rating,
      email,
      timestamp: new Date().toISOString(),
    };

    const existingFeedback = JSON.parse(localStorage.getItem("userFeedback") || "[]");
    existingFeedback.push(feedbackData);
    localStorage.setItem("userFeedback", JSON.stringify(existingFeedback));

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFeedback("");
      setRating(0);
      setEmail("");
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            id="feedback-modal-title"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Send Feedback
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Close feedback modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4" aria-hidden="true">
              ✓
            </div>
            <p className="text-xl text-green-600 dark:text-green-400">
              Thank you for your feedback!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How helpful was this study guide?
              </label>
              <div className="flex gap-2" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    aria-pressed={rating >= star}
                  >
                    <span
                      className={
                        rating >= star ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="feedback-text"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your feedback (required)
              </label>
              <textarea
                id="feedback-text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Tell us what you think..."
                required
                aria-required="true"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="feedback-email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email (optional)
              </label>
              <input
                id="feedback-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!feedback}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Feedback
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
