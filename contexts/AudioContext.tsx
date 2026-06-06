import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type AudioContextValue = {
  isMuted: boolean;
  toggleMute: () => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted (sound on)

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ isMuted, toggleMute }),
    [isMuted, toggleMute]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return ctx;
}
