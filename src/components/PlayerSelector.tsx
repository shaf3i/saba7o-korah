"use client";

import { useState } from "react";
import { Players, PlayerEra } from "@/data/players";

interface PlayerSelectorProps {
  onPlayerSelect: (player: string) => void;
}

export default function PlayerSelector({
  onPlayerSelect,
}: PlayerSelectorProps) {
  const [selectedEra, setSelectedEra] = useState<PlayerEra>("General players");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [isPlayerRevealed, setIsPlayerRevealed] = useState(false);

  const selectRandomPlayer = () => {
    try {
      const players = Players[selectedEra];
      if (!players || players.length === 0) {
        console.error("No players available in selected era");
        return;
      }

      const randomIndex = Math.floor(Math.random() * players.length);
      const selectedPlayer = players[randomIndex];
      setCurrentPlayer(selectedPlayer);
      setIsPlayerRevealed(true);

      // Hide the player name after 5 seconds
      setTimeout(() => {
        setIsPlayerRevealed(false);
        onPlayerSelect(selectedPlayer);
      }, 5000);
    } catch (error) {
      console.error("Error selecting random player:", error);
    }
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
      <h2 className="text-xl font-bold text-white mb-4">Player Selection</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Select Era
          </label>
          <select
            value={selectedEra}
            onChange={(e) => setSelectedEra(e.target.value as PlayerEra)}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 
                     text-white focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.keys(Players).map((era) => (
              <option key={era} value={era}>
                {era}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={selectRandomPlayer}
          className="w-full bg-green-600 text-white px-4 py-2 rounded 
                   hover:bg-green-700 transition-colors"
        >
          Get Random Player
        </button>

        {/* Player Reveal Section */}
        {isPlayerRevealed && (
          <div className="mt-4 text-center animate-fade-in">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                Selected Player
              </h3>
              <p className="text-2xl text-yellow-400">{currentPlayer}</p>
              <p className="text-sm text-gray-300 mt-2">
                Remember this player! The name will disappear in 5 seconds...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
