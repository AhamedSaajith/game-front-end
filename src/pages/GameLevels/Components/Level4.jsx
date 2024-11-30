import React, { useState, useEffect } from "react";
import backgroundImage from "../../../assets/th (1).jpeg";
import Popup from "../../../components/ui/Popup";
import ApiPopup from "../../../components/ui/ApiPopup";

export default function Level2({ nextLevel, updateScore, score }) {
  const [question, setQuestion] = useState({
    text: "What is the capital of india?",
    options: ["New Delhi", "London", "Colombo", "Madrid"],
    answer: "Colombo"
  });

  const [timer, setTimer] = useState(20);
  const [hearts, setHearts] = useState(4);
  const [quizEnded, setQuizEnded] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [apiPopupVisible, setApiPopupVisible] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setQuizEnded(true);
      setPopupMessage("Time's up! Game over.");
      setShowPopup(true);
      return;
    }

    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswer = (option) => {
    if (quizEnded) return;

    if (option === question.answer) {
      setIsCorrectAnswer(true);
      setApiPopupVisible(true);
    } else {
      if (hearts > 1) {
        setHearts(hearts - 1);
        setPopupMessage("Incorrect answer! Try again.");
        setShowPopup(true);
      } else {
        setHearts(0);
        setQuizEnded(true);
        setPopupMessage("No hearts left! Game over.");
        setShowPopup(true);
      }
    }
  };

  const handleApiPopupClose = (data) => {
    setApiPopupVisible(false);

    if (data && data.isValid) {
      nextLevel && nextLevel(); // Move to next level only on successful API validation
    } else {
      setPopupMessage("API validation failed. Try again.");
      setShowPopup(true);
    }
  };

  const resetGame = () => {
    setTimer(20);
    setHearts(4);
    setQuizEnded(false);
    setPopupMessage("");
    setShowPopup(false);
  };

  const handleLogOut = () => {
    console.log("Logging out...");
    // Add log-out logic here
  };

  const handleNewGame = () => {
    resetGame();
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="fixed top-4 text-center text-5xl font-extrabold text-yellow-300">
        🤷‍♂️ Bananuiz 🤷‍♂️
      </header>

      <div className="w-full max-w-lg p-8 space-y-6 rounded-lg shadow-lg backdrop-blur-md bg-white/10 mt-24">
        <h2 className="text-3xl font-bold text-center text-white">Level 4</h2>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-lg font-semibold text-white">
            <span className="mr-2">⏰</span>
            <span>{timer < 10 ? `0${timer}` : timer} sec</span>
          </div>
          <div className="flex items-center space-x-1">
            {Array.from({ length: hearts }, (_, index) => (
              <span key={index} className="text-yellow-500 text-2xl">
                🍌
              </span>
            ))}
          </div>
        </div>

        <p className="text-xl font-semibold text-center text-white mt-4">
          {question.text}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={quizEnded}
              className={`px-4 py-2 rounded-lg transition duration-200 font-bold ${
                quizEnded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleLogOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition duration-200 font-semibold"
          >
            Log Out
          </button>

          <button
            onClick={handleNewGame}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
          >
            New Game
          </button>
        </div>
      </div>

      {showPopup && <Popup message={popupMessage} onClose={handlePopupClose} />}

      {apiPopupVisible && (
        <ApiPopup
          onClose={(data) => handleApiPopupClose(data)}
          isCorrect={isCorrectAnswer}
        />
      )}
    </div>
  );
}
