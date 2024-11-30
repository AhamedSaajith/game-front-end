import React from 'react';
import backgroundImage from "../../assets/th (1).jpeg";

export default function Scoreboard() {
  const players = [
    { name: 'Alice', score: 150 },
    { name: 'Bob', score: 120 },
    { name: 'Charlie', score: 100 },
    { name: 'Diana', score: 80 },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="fixed top-4 text-center text-5xl font-extrabold text-yellow-300">
        🤷‍♂️ Bananuiz 🤷‍♂️
      </header>
      <div className="bg-black bg-opacity-50 p-8 rounded-xl shadow-lg max-w-md w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Scoreboard</h2>
        <ul className="space-y-4">
          {players.map((player, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow"
            >
              <span className="text-lg font-semibold">{player.name}</span>
              <span className="text-xl font-bold">{player.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
