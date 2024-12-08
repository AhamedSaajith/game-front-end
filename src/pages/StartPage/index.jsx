import React from "react";
import backgroundImage from "../../assets/th (1).jpeg";
import { Link } from "react-router-dom";

export default function Start() {
  

 

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="text-center bg-opacity-75 bg-black p-8 rounded-lg shadow-lg">
        <header className="mb-6">
          <h1 className="text-5xl font-extrabold text-yellow-300 mb-4">
            🤷‍♂️ Welcome To Bananuiz 🤷‍♂️
          </h1>
          <h2 className="text-4xl font-extrabold text-red-600 mb-4">
            Game Rules
          </h2>
          <ul className="text-lg text-gray-200 space-y-2">
            <li>1. There are four Levels.</li>
            <li>2. Each Level has two questios one is common and other is api question.</li>
            <li>3. Each Level has 25 score common question has 15 and api question has 10 Toatal 100 </li>
            <li>4. Answer the questions within the time limit.</li>
            <li>5. You will lose a heart for each wrong answer.</li>
            <li>6. The game ends when you run out of hearts or time.</li>
            <li>7. Get as many correct answers as you can to score high!</li>
          </ul>
        </header>

        {/* Start Game Button */}
        <div>
        <Link
              to="/login"
              className="px-6 py-2 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-400 transition duration-200"
            >
              StartGame
            </Link>
        </div>
      </div>
    </div>
  );
}
