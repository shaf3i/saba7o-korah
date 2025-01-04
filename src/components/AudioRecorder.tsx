"use client";

import { useState, useRef, useEffect } from "react";

export default function AudioRecorder() {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.current.start(200);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  return (
    <section className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Audio Recording</h2>
      <div className="space-y-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {audioURL && (
          <div className="space-y-2">
            <audio
              controls
              src={audioURL}
              className="w-full"
              onError={(e) => console.error("Audio playback error:", e)}
            >
              Your browser does not support the audio element.
            </audio>
            <button
              onClick={() => {
                URL.revokeObjectURL(audioURL);
                setAudioURL(null);
              }}
              className="text-red-600 text-sm hover:text-red-700"
            >
              Delete Recording
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
