import React, { useState, useEffect } from "react";
import backgroundImage from "../../../assets/th (1).jpeg";
import Popup from "../../../components/ui/Popup";
import ApiPopup from "../../../components/ui/ApiPopup";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../Firebase/config";

export default function Level1() {
  const [question] = useState({
    text: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  });
  const [timer, setTimer] = useState(60);
  const [hearts, setHearts] = useState(4);
  const [quizEnded, setQuizEnded] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [apiPopupVisible, setApiPopupVisible] = useState(false);
  const [username, setUsername] = useState("Loading...");
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.name || "Guest");
            setScore(userData.score || 0);
          } else {
            console.warn("User document does not exist.");
          }
        } else {
          console.warn("No authenticated user found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (timer === 0) {
      endQuiz("Time's up! Game over.");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Handle answer selection
  const handleAnswer = async (option) => {
    if (quizEnded) return;

    if (option === question.answer) {
      await updateScore(score + 15);
      setApiPopupVisible(true);
    } else {
      handleIncorrectAnswer();
    }
  };

  // Handle incorrect answers
  const handleIncorrectAnswer = () => {
    if (hearts > 1) {
      setHearts((prev) => prev - 1);
      setPopupMessage("Incorrect answer! Try again.");
      setShowPopup(true);
    } else {
      endQuiz("No hearts left! Game over.");
    }
  };

  // Update score in Firestore
  const updateScore = async (newScore) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { score: newScore });
        setScore(newScore);
      }
    } catch (error) {
      console.error("Error updating score: ", error);
    }
  };

  // End the quiz
  const endQuiz = (message) => {
    setQuizEnded(true);
    setPopupMessage(message);
    setShowPopup(true);
  };

  // Handle closing of the API popup
  const handleApiPopupClose = async (data) => {
    setApiPopupVisible(false);
    if (data?.isValid) {
      await updateScore(score + 10);
      navigate("/level2");
    } else {
      setPopupMessage("API validation failed. Try again.");
      setShowPopup(true);
    }
  };

  // Start a new game
  const handleNewGame = () => {
    setTimer(60);
    setHearts(4);
    setQuizEnded(false);
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="fixed top-4 w-full flex flex-col items-center text-center text-yellow-300">
        <h1 className="text-5xl font-extrabold">🤷‍♂ Bananuiz 🤷‍♂</h1>
        <div className="mt-2 flex space-x-6 text-lg font-semibold text-white">
          <div>
            <span className="text-gray-300">Username: </span>
            <span className="text-yellow-300">{username}</span>
          </div>
          <div>
            <span className="text-gray-300">Score: </span>
            <span className="text-yellow-300">{score}</span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-lg p-8 space-y-6 rounded-lg shadow-lg bg-white/10 mt-32">
        <h2 className="text-3xl font-bold text-center text-white">Level 1</h2>
        <div className="flex justify-between items-center">
          <div className="text-white">
            <span>⏰</span> {timer}s
          </div>
          <div>
            {Array.from({ length: hearts }).map((_, idx) => (
              <span key={idx} className="text-yellow-500 text-2xl">
                🍌
              </span>
            ))}
          </div>
        </div>

        <p className="text-xl text-center text-white">{question.text}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`px-4 py-2 rounded-lg font-bold ${
                quizEnded ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
              }`}
              disabled={quizEnded}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => signOut(auth).then(() => navigate("/login"))}
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

      {/* Popups */}
      {showPopup && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
      {apiPopupVisible && (
        <ApiPopup onClose={handleApiPopupClose} isCorrect={true} />
      )}
    </div>
  );
}
