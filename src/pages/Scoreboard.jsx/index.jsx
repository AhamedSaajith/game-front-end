import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../Firebase/config"; // Import your Firebase configuration

import backgroundImage from "../../assets/th (1).jpeg"; // Ensure correct path for the background image

export default function Scoreboard() {
  const [players, setPlayers] = useState([]);

  // Fetch players from Firestore
  useEffect(() => {
    const fetchPlayers = async () => {
      const playersCollection = collection(db, "users"); // Your Firestore collection name
      const q = query(playersCollection, orderBy("score", "desc"));
      const querySnapshot = await getDocs(q);

      // Map over the query snapshot to extract player data
      const playersData = querySnapshot.docs.map((doc) => {
        const player = doc.data();
        return {
          id: doc.id,
          username: player.name || "Unknown User", // Change 'name' to 'name' as per your structure
          score: player.score || 0, // Handle cases where score might not exist
          lastplaydate: player.lastplaydate
            ? player.lastplaydate.toDate
              ? player.lastplaydate.toDate()
              : player.lastplaydate // Check if toDate exists
            : null, // Ensure the date field is handled correctly
        };
      });
      setPlayers(playersData);
    };

    fetchPlayers();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Fixed background image URL syntax
    >
      <header className="fixed top-4 text-center text-5xl font-extrabold text-yellow-300">
        🤷‍♂ Bananuiz 🤷‍♂
      </header>
      <div className="bg-black bg-opacity-50 p-8 rounded-xl shadow-lg max-w-md w-full text-white mt-20">
        <h2 className="text-3xl font-bold text-center mb-6">Scoreboard</h2>
        <div className="grid grid-cols-4 gap-4 bg-gray-900 p-3 rounded-t-lg text-yellow-300 font-bold">
          <span className="text-center">Rank</span>
          <span className="text-center">Username</span>
          <span className="text-center">Score</span>
        </div>
        <ul className="space-y-2">
          {players.map((player, index) => (
            <li
              key={player.id} // Using player's unique ID as key
              className="grid grid-cols-4 gap-4 items-center p-4 bg-gray-800 rounded-lg shadow"
            >
              <span className="text-center text-lg font-semibold">
                {index + 1}
              </span>
              <span className="text-center text-lg font-semibold">
                {player.username}
              </span>
              <span className="text-center text-xl font-bold">
                {player.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
