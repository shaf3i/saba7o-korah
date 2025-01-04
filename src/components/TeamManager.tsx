"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import styles from "./TeamManager.module.css";

interface Team {
  name: string;
  score: number;
}

export default function TeamManager() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showWinner, setShowWinner] = useState(false);
  const [winningTeam, setWinningTeam] = useState<Team | null>(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [isAddingTeam, setIsAddingTeam] = useState(false);

  const updateScore = (index: number, increment: boolean) => {
    setTeams(
      teams.map((team, i) => {
        if (i === index) {
          return { ...team, score: team.score + (increment ? 1 : -1) };
        }
        return team;
      })
    );
  };

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      setTeams([...teams, { name: newTeamName.trim(), score: 0 }]);
      setNewTeamName("");
      setIsAddingTeam(false);
    }
  };

  const handleRemoveTeam = (index: number) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  const fireWinnerCelebration = () => {
    // Find the winning team
    const winner = teams.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );
    setWinningTeam(winner);
    setShowWinner(true);

    // Create multiple firework effects
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    // Add some stars
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      shapes: ["star"],
      colors: ["FFE15D", "FFB72B", "FF9EAA"],
    });

    // Try to play celebration sound, but don't break if file is missing
    try {
      const audio = new Audio("/sounds/winner.mp3");
      audio.volume = 0.8;
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    } catch (error) {
      console.log("Error creating audio:", error);
    }

    // Hide winner after some time
    setTimeout(() => {
      setShowWinner(false);
      setWinningTeam(null);
    }, 15000);
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
      <h2 className="text-xl font-bold text-white mb-4">Teams</h2>
      <div className="space-y-4">
        {teams.map((team, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg group"
          >
            <span className="text-white font-medium">{team.name}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateScore(index, false)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 
                         transition-colors disabled:opacity-50"
                disabled={team.score <= 0}
              >
                -
              </button>
              <span className="text-white min-w-[2rem] text-center font-bold">
                {team.score}
              </span>
              <button
                onClick={() => updateScore(index, true)}
                className="px-2 py-1 bg-green-500 text-white rounded 
                         hover:bg-green-600 transition-colors"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveTeam(index)}
                className="opacity-0 group-hover:opacity-100 ml-2 px-2 py-1 
                         bg-red-500 text-white rounded hover:bg-red-600 
                         transition-all"
                title="Remove Team"
              >
                ×
              </button>
            </div>
          </div>
        ))}

        {isAddingTeam ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Enter team name"
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 
                       rounded-md text-white focus:outline-none focus:ring-2 
                       focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddTeam();
                }
              }}
            />
            <button
              onClick={handleAddTeam}
              className="px-4 py-2 bg-blue-500 text-white rounded 
                       hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingTeam(false);
                setNewTeamName("");
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded 
                       hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTeam(true)}
            className="w-full py-2 bg-blue-500 text-white rounded 
                     hover:bg-blue-600 transition-colors"
          >
            Add Team
          </button>
        )}

        <button
          onClick={fireWinnerCelebration}
          className="w-full mt-4 py-2 bg-yellow-500 text-gray-900 rounded-lg 
                   font-bold hover:bg-yellow-400 transition-colors"
        >
          Show Winner
        </button>
      </div>

      {showWinner && winningTeam && (
        <div className={styles.winnerOverlay}>
          <div className={styles.winnerContent}>
            <h3 className={styles.winnerTitle}>🏆 Champion! 🏆</h3>
            <div className={styles.winnerName}>{winningTeam.name}</div>
            <div className={styles.winnerScore}>Score: {winningTeam.score}</div>
          </div>
        </div>
      )}
    </div>
  );
}
