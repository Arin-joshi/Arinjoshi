import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";

const AudioToggle: React.FC = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <button
      type="button"
      onClick={toggleMute}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white/95 text-red-600 shadow-sm transition-all hover:border-red-400 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800/90 dark:text-red-300 dark:hover:border-red-500/50 dark:hover:text-red-300"
      aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
      title={isMuted ? "Unmute sound" : "Mute sound"}
    >
      {isMuted ? (
        <VolumeX size={20} aria-hidden />
      ) : (
        <Volume2 size={20} aria-hidden />
      )}
    </button>
  );
};

export default AudioToggle;
