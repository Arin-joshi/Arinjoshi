import { useCallback, useRef, useState } from 'react';

export function useRafTilt() {
  const [hoverCoords, setHoverCoords] = useState<Record<string, { x: number; y: number }>>({});
  const [tiltStyle, setTiltStyle] = useState<Record<string, string>>({});
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ id: string; x: number; y: number; width: number; height: number } | null>(null);

  const flushTilt = useCallback(() => {
    const pending = pendingRef.current;
    if (!pending) return;

    const { id, x, y, width, height } = pending;
    const centerX = width / 2;
    const centerY = height / 2;
    const rotateX = ((centerY - y) / centerY) * 3;
    const rotateY = ((x - centerX) / centerX) * 3;

    setHoverCoords((prev) => ({ ...prev, [id]: { x, y } }));
    setTiltStyle((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
    }));

    rafRef.current = null;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, id: string) => {
      const rect = e.currentTarget.getBoundingClientRect();
      pendingRef.current = {
        id,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        width: rect.width,
        height: rect.height,
      };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flushTilt);
      }
    },
    [flushTilt]
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
    setTiltStyle((prev) => ({
      ...prev,
      [id]: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    }));
  }, []);

  return { hoverCoords, tiltStyle, handleMouseMove, handleMouseLeave };
}
