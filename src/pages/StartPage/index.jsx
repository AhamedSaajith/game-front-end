import React from 'react';
import backgroundImage from "../../assets/th (1).jpeg";

export default function Start() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center text-5xl font-extrabold text-yellow-300">
        🤷‍♂️ Welcome To Bananuiz 🤷‍♂️
      </header>
    </div>
  );
}
