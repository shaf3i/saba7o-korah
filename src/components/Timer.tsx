"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Timer.module.css";
import confetti from "canvas-confetti";

interface TimerProps {
  duration: number;
  onComplete: (playerName: string) => void;
  playerName: string;
  onNewRound: () => void;
}

export const Timer = ({
  duration,
  onComplete,
  playerName,
  onNewRound,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isComplete, setIsComplete] = useState(false);
  const [dashArray, setDashArray] = useState("283");
  const FULL_DASH_ARRAY = 283;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fireCelebration = () => {
    // Fire multiple confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    // Create audio element once when component mounts
    audioRef.current = new Audio("/sounds/timer-end.mp3");
    audioRef.current.volume = 1;

    // Cleanup when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          const rawTimeFraction = newTime / duration;
          const timeFraction =
            rawTimeFraction - (1 / duration) * (1 - rawTimeFraction);
          const circleDasharray = `${(timeFraction * FULL_DASH_ARRAY).toFixed(
            0
          )} 283`;
          setDashArray(circleDasharray);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      // Play the sound when timer completes
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log("Error playing audio:", error);
        });
      }
      onComplete(playerName);
      fireCelebration(); // Fire celebration effects
    }
  }, [timeLeft, isComplete, duration, onComplete, playerName]);

  return (
    <div className={styles.timerContainer}>
      {!isComplete ? (
        <div className={styles.baseTimer}>
          <svg className={styles.baseTimerSvg} viewBox="0 0 100 100">
            <circle
              className={styles.baseTimerPathBackground}
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className={styles.baseTimerPathRemaining}
              cx="50"
              cy="50"
              r="45"
              style={{
                strokeDasharray: dashArray,
              }}
            />
          </svg>
          <div className={styles.baseTimerLabel}>
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>
      ) : (
        <div className={styles.playerReveal}>
          <div className={styles.celebrationText}>🎉 Selected Player 🎯</div>
          <h2>{playerName}</h2>
          <button onClick={onNewRound} className={styles.newRoundButton}>
            Start New Round
          </button>
        </div>
      )}
    </div>
  );
};
