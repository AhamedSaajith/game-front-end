import React, { useState, useEffect } from "react";
import backgroundImage from "../../../assets/th (1).jpeg";
import Popup from "../../../components/ui/Popup";
import ApiPopup from "../../../components/ui/ApiPopup";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../Firebase/config"; // Firebase import

export default function Level3() {
  const [question] = useState({
    text: "What is the capital of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Nagasaki"],
    answer: "Tokyo",
  });
  const [username, setUsername] = useState("Loading...");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [hearts, setHearts] = useState(4);
  const [quizEnded, setQuizEnded] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [apiPopupVisible, setApiPopupVisible] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
 
  const navigate = useNavigate();

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
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


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

  const updateScoreInFirebase = async (newScore) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    try {
      await updateDoc(userRef, {
        score: newScore,
      });
      console.log("Score updated in Firebase.");
    } catch (error) {
      console.error("Error updating score: ", error);
    }
  };

  const handleAnswer = (option) => {
    if (quizEnded) return;

    if (option === question.answer) {
      setIsCorrectAnswer(true);
      setApiPopupVisible(true);
      const newScore = score + 15; // Increment score for correct answer
      setScore(newScore); // Update score in state
      updateScoreInFirebase(newScore); // Update score in Firebase
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
    console.log("API Popup Closed:", data); // Debugging log
    setApiPopupVisible(false); // Close ApiPopup
    if (data && data.isValid) {
      console.log("Navigating to Level 4");
      const newScore = score + 10; // Increment score for popup validation
      setScore(newScore); // Update score in state
      updateScoreInFirebase(newScore); // Update score in Firebase
      navigate("/level4", { state: { username, score: newScore } }); // Pass username and score to Level 4
    } else {
      console.log("Validation failed");
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
      style={{ backgroundImage: `url(${backgroundImage})` }} // Fixed background image URL
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
      <div className="w-full max-w-lg p-8 space-y-6 rounded-lg shadow-lg backdrop-blur-md bg-white/10 mt-24">
        <h2 className="text-3xl font-bold text-center text-white">Level 3</h2>

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
