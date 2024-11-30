import React from 'react';

export default function Popup({ message, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-300 text-black p-4 shadow-lg flex justify-between items-center z-50">
      <span className="text-lg font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 bg-slate-700  text-black-500 px-4 py-2 rounded hover:bg-slate-400  transition"
      >
       ❌
      </button>
    </div>
  );
}
