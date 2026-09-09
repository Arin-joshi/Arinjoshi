import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CursorContext = createContext<CursorPosition>({ x: 0, y: 0 });

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        setPosition(pendingRef.current);
        rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const value = useMemo(() => position, [position.x, position.y]);

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

export const useCursor = () => useContext(CursorContext);
