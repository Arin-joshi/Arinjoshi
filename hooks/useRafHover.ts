import { useCallback, useRef, useState } from 'react';

export function useRafHover() {
  const [hoverCoords, setHoverCoords] = useState<Record<string, { x: number; y: number }>>({});
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ id: string; x: number; y: number } | null>(null);

  const flushHover = useCallback(() => {
    const pending = pendingRef.current;
    if (!pending) return;
    setHoverCoords((prev) => ({ ...prev, [pending.id]: { x: pending.x, y: pending.y } }));
    rafRef.current = null;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>, id: string) => {
      const rect = e.currentTarget.getBoundingClientRect();
      pendingRef.current = {
        id,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flushHover);
      }
    },
    [flushHover]
  );

  const handleMouseLeave = useCallback((id: string) => {
    pendingRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setHoverCoords((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, []);

  return { hoverCoords, handleMouseMove, handleMouseLeave };
}
