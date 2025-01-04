"use client";

import { useState } from "react";
import { premierLeaguePlayers } from "@/data/players";

export default function PlayerSelector() {
  const [currentPlayer, setCurrentPlayer] = useState<string>("");

  const selectRandomPlayer = () => {
    try {
      const players = premierLeaguePlayers["Premier League (2013 - Now)"];
      const randomIndex = Math.floor(Math.random() * players.length);
      setCurrentPlayer(players[randomIndex]);
    } catch (error) {
      console.error("Error selecting player:", error);
    }
  };

  return (
    <section className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Current Player</h2>
      <button
        onClick={selectRandomPlayer}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Select Random Player
      </button>
      {currentPlayer && <p className="mt-4">Current Player: {currentPlayer}</p>}
    </section>
  );
}
