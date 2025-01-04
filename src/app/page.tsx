"use client";
import { useState } from "react";
import { Timer } from "@/components/Timer";
import AudioRecorder from "@/components/AudioRecorder";
import TeamManager from "@/components/TeamManager";
import PlayerSelector from "@/components/PlayerSelector";
import TimerControls from "@/components/TimerControls";

export default function Home() {
  const [showTimer, setShowTimer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [timerDuration, setTimerDuration] = useState(60);

  const handleStartTimer = (player: string, duration: number) => {
    setSelectedPlayer(player);
    setTimerDuration(duration);
    setShowTimer(true);
  };

  const handleTimerComplete = (playerName: string) => {
    // Remove the automatic hiding of the player name
    // The user will now control when to start a new round
  };

  const handleNewRound = () => {
    setShowTimer(false);
    setSelectedPlayer("");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-800 shadow-lg border-b border-gray-700 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Sab7o Korah</h1>
        </div>
      </header>

      {/* Timer Overlay */}
      {showTimer && (
        <Timer
          duration={timerDuration}
          onComplete={handleTimerComplete}
          playerName={selectedPlayer}
          onNewRound={handleNewRound}
        />
      )}

      {/* Main Content - Scrollable */}
      <main className="flex-grow mt-[72px] mb-[60px]">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Game Controls Section */}
            <div className="space-y-6 lg:col-span-2">
              {/* Timer and Audio Row */}
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <TimerControls
                  onStartTimer={handleStartTimer}
                  selectedPlayer={selectedPlayer}
                />
                <AudioRecorder />
              </div>
              {/* Player Selection */}
              <PlayerSelector onPlayerSelect={setSelectedPlayer} />
            </div>

            {/* Teams Section */}
            <div className="lg:col-span-1">
              <TeamManager />
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg border-t border-gray-700 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            Shaf3i © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
