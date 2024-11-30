import React, { useState } from "react";
import axios from "axios";
import Popup from "./Popup"; // Import your reusable Popup component

export default function ApiPopup({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [incorrectAnswer, setIncorrectAnswer] = useState(false); // State to handle incorrect answer popup

  const generateApiData = async () => {
    setLoading(true);
    setApiResponse(null);

    try {
      const response = await axios.get(
        `https://marcconrad.com/uob/banana/api.php?out=json`
      );

      if (response.status !== 200) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      setApiResponse({
        image: response.data.question,
        solution: response.data.solution,
      });
    } catch (error) {
      console.error("Error fetching API data:", error);
      alert("Failed to fetch data. Please try again.");
      onClose({ isValid: false }); // Notify parent of failure
    } finally {
      setLoading(false);
    }
  };

  const handleNumberClick = (number) => {
    setUserAnswer((prev) => prev + number);
  };

  const checkAnswer = () => {
    if (userAnswer.trim() === String(apiResponse.solution)) {
     
      onClose({ isValid: true }); // Notify parent of success
    } else {
      setIncorrectAnswer(true); // Show incorrect answer popup
      setUserAnswer(""); // Clear the input for a retry
    }
  };

  const clearInput = () => setUserAnswer("");

  const closePopup = () => {
    setIncorrectAnswer(false); // Close the incorrect answer popup
  };

  return (
    <div>
      {/* Conditionally render Popup for incorrect answer */}
      {incorrectAnswer && (
        <Popup
          message="Please try again."
          onClose={closePopup}
        />
      )}

      <div className="fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center z-40">
        <div className="bg-black p-6 rounded-lg shadow-lg text-center w-full max-w-4xl relative">
          {/* Close Button Positioned in the Top Right Corner */}
          <button
            onClick={() => onClose({ isValid: false })}
            className="absolute top-4 right-4 bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-400 transition"
          >
            ❌
          </button>

          <h2 className="text-5xl font-extrabold text-amber-400 mb-4">
            🤷‍♂️ Bananuiz 🤷‍♂️
          </h2>

          {!apiResponse ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={generateApiData}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Fetch Question"}
            </button>
          ) : (
            <>
              <img
                src={apiResponse.image}
                alt="Question"
                className="my-4 mx-auto"
              />
              <input
                className="border border-gray-300 p-2 rounded w-full max-w-md"
                placeholder="Enter your answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />

              <div className="flex justify-center gap-3 mt-4">
                {[...Array(10).keys()].map((num) => (
                  <button
                    key={num}
                    className="bg-neutral-400 hover:bg-yellow-300 rounded-full w-12 h-12 text-lg font-bold flex items-center justify-center"
                    onClick={() => handleNumberClick(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Buttons container using Flexbox for alignment */}
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                  onClick={clearInput}
                >
                  Clear
                </button>

                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={checkAnswer}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
