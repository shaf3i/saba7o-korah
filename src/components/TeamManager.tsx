"use client";

import { useState } from "react";

interface Team {
  id: number;
  name: string;
  score: number;
}

export default function TeamManager() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState<string>("");
  const [winner, setWinner] = useState<Team | null>(null);

  const addTeam = () => {
    if (!newTeamName.trim()) return;

    const newTeam: Team = {
      id: teams.length + 1,
      name: newTeamName.trim(),
      score: 0,
    };
    setTeams([...teams, newTeam]);
    setNewTeamName("");
  };

  const updateScore = (teamId: number, points: number) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId ? { ...team, score: team.score + points } : team
      )
    );
    setWinner(null);
  };

  const showWinner = () => {
    if (teams.length === 0) return;

    const highestScore = Math.max(...teams.map((team) => team.score));
    const winners = teams.filter((team) => team.score === highestScore);

    if (winners.length === 1) {
      setWinner(winners[0]);
    } else {
      setWinner({
        id: 0,
        name: "Tie between " + winners.map((w) => w.name).join(" and "),
        score: highestScore,
      });
    }
  };

  return (
    <section className="p-4 border border-gray-700 rounded-lg bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Teams</h2>
        {winner && (
          <div className="flex items-center">
            <span className="text-purple-400 mr-2">Winner:</span>
            <span className="text-white font-semibold">{winner.name}</span>
            <span className="text-purple-400 ml-2">({winner.score})</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Enter team name"
          className="p-2 border border-gray-600 rounded flex-1 bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={addTeam}
          disabled={!newTeamName.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Add Team
        </button>
      </div>

      {/* Scrollable teams list */}
      <div className="max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="p-4 border border-gray-700 rounded bg-gray-700"
            >
              <h3 className="font-semibold text-white">{team.name}</h3>
              <p className="my-2 text-gray-300">Score: {team.score}</p>
              <div className="space-x-2">
                <button
                  onClick={() => updateScore(team.id, 1)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                >
                  +1
                </button>
                <button
                  onClick={() => updateScore(team.id, -1)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  -1
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {teams.length > 0 && (
        <div className="mt-4">
          <button
            onClick={showWinner}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Show Winner
          </button>
        </div>
      )}
    </section>
  );
}
