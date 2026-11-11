import React, { useRef } from 'react';
import { useCursor } from '../contexts/CursorContext';

interface LookAtCursorProps {
  type: 'robot' | 'cat' | 'duck';
  className?: string;
}

const LookAtCursor: React.FC<LookAtCursorProps> = React.memo(({ type, className = 'mx-auto' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x: cursorX, y: cursorY } = useCursor();

  const container = containerRef.current;
  let coords = { rotateX: 0, rotateY: 0, tx: 0, ty: 0 };

  if (container) {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = cursorX - centerX;
    const dy = cursorY - centerY;
    const maxRotation = 18;
    const maxTranslation = 8;
    const screenW = window.innerWidth || 1200;
    const screenH = window.innerHeight || 800;
    const ratioX = dx / (screenW / 2);
    const ratioY = dy / (screenH / 2);
    const clampedX = Math.max(-1, Math.min(1, ratioX));
    const clampedY = Math.max(-1, Math.min(1, ratioY));

    coords = {
      rotateX: -clampedY * maxRotation,
      rotateY: clampedX * maxRotation,
      tx: clampedX * maxTranslation,
      ty: clampedY * maxTranslation,
    };
  }

  const transitionStyle = {
    transition: 'transform 0.28s cubic-bezier(0.1, 0.8, 0.25, 1)',
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none w-24 h-24 cursor-default z-20 ${className}`}
      style={{ perspective: '1000px' }}
    >
      {type === 'robot' && (
        <div
          className="relative w-20 h-16 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-[22px] flex items-center justify-center shadow-lg shadow-violet-950/20 border border-violet-400/20"
          style={{
            transform: `rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) translate3d(${coords.tx}px, ${coords.ty}px, 0)`,
            ...transitionStyle,
          }}
        >
          <div className="absolute -top-1.5 w-1 h-3 bg-violet-400 rounded-full transform -translate-y-1">
            <div className="w-2.5 h-2.5 bg-fuchsia-400 rounded-full -translate-x-0.5 -translate-y-1.5 animate-pulse shadow-[0_0_8px_#e879f9]" />
          </div>
          <div className="absolute -left-1 w-1.5 h-4 bg-violet-700 rounded-full" />
          <div className="absolute -right-1 w-1.5 h-4 bg-violet-700 rounded-full" />
          <div
            className="w-14 h-10 bg-slate-950 rounded-[14px] flex items-center justify-center border border-slate-800/80 shadow-inner"
            style={{
              transform: `translate3d(${coords.tx * 0.8}px, ${coords.ty * 0.8}px, 0)`,
              ...transitionStyle,
            }}
          >
            <div
              className="flex gap-2.5"
              style={{
                transform: `translate3d(${coords.tx * 0.6}px, ${coords.ty * 0.6}px, 0)`,
                ...transitionStyle,
              }}
            >
              <div className="w-2 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
              <div className="w-2 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
            </div>
          </div>
        </div>
      )}

      {type === 'cat' && (
        <div
          className="relative bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center shadow-lg shadow-fuchsia-950/20 border border-pink-400/20"
          style={{
            width: '72px',
            height: '64px',
            borderRadius: '24px',
            transform: `rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) translate3d(${coords.tx}px, ${coords.ty}px, 0)`,
            ...transitionStyle,
          }}
        >
          <div className="absolute -top-2 -left-0.5 w-5 h-5 bg-fuchsia-600 rounded-tr-lg rounded-bl-lg transform rotate-[15deg] border-t border-l border-pink-400/40" />
          <div className="absolute -top-2 -right-0.5 w-5 h-5 bg-pink-500 rounded-tl-lg rounded-br-lg transform rotate-[-15deg] border-t border-r border-pink-400/40" />
          <div className="absolute -top-0.5 left-1 w-2.5 h-3 bg-pink-300 rounded-tr-md rounded-bl-md transform rotate-[15deg]" />
          <div className="absolute -top-0.5 right-1 w-2.5 h-3 bg-pink-300 rounded-tl-md rounded-br-md transform rotate-[-15deg]" />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center mt-1"
            style={{
              transform: `translate3d(${coords.tx * 0.9}px, ${coords.ty * 0.9}px, 0)`,
              ...transitionStyle,
            }}
          >
            <div className="flex gap-4">
              <div className="relative w-3.5 h-3.5 bg-slate-900 rounded-full overflow-hidden flex items-center justify-center">
                <div
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{
                    top: '2px',
                    left: '2px',
                    transform: `translate3d(${coords.tx * 0.25}px, ${coords.ty * 0.25}px, 0)`,
                    ...transitionStyle,
                  }}
                />
              </div>
              <div className="relative w-3.5 h-3.5 bg-slate-900 rounded-full overflow-hidden flex items-center justify-center">
                <div
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{
                    top: '2px',
                    left: '2px',
                    transform: `translate3d(${coords.tx * 0.25}px, ${coords.ty * 0.25}px, 0)`,
                    ...transitionStyle,
                  }}
                />
              </div>
            </div>
            <div
              className="flex flex-col items-center mt-1"
              style={{
                transform: `translate3d(${coords.tx * 0.5}px, ${coords.ty * 0.5}px, 0)`,
                ...transitionStyle,
              }}
            >
              <div className="w-1.5 h-1 bg-pink-400 rounded-full" />
              <div className="w-3.5 h-1 border-b border-pink-400/80 rounded-full -mt-0.5" />
            </div>
          </div>
        </div>
      )}

      {type === 'duck' && (
        <div
          className="relative w-16 h-16 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg shadow-yellow-950/20 border border-yellow-200/40"
          style={{
            transform: `rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) translate3d(${coords.tx}px, ${coords.ty}px, 0)`,
            ...transitionStyle,
          }}
        >
          <div className="absolute left-1.5 bottom-3.5 w-3 h-2 bg-rose-400/30 rounded-full filter blur-[1px]" />
          <div className="absolute right-1.5 bottom-3.5 w-3 h-2 bg-rose-400/30 rounded-full filter blur-[1px]" />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center mt-0.5"
            style={{
              transform: `translate3d(${coords.tx * 0.9}px, ${coords.ty * 0.9}px, 0)`,
              ...transitionStyle,
            }}
          >
            <div className="flex gap-4 mb-0.5">
              <div className="w-2.5 h-2.5 bg-slate-900 rounded-full relative">
                <div className="absolute w-1 h-1 bg-white rounded-full top-0.5 left-0.5" />
              </div>
              <div className="w-2.5 h-2.5 bg-slate-900 rounded-full relative">
                <div className="absolute w-1 h-1 bg-white rounded-full top-0.5 left-0.5" />
              </div>
            </div>
            <div
              className="w-7 h-4 bg-gradient-to-b from-orange-400 to-orange-500 rounded-[10px] border border-orange-600/20 shadow-md shadow-orange-950/15"
              style={{
                transform: `translate3d(${coords.tx * 0.6}px, ${coords.ty * 0.6}px, 0)`,
                ...transitionStyle,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

LookAtCursor.displayName = 'LookAtCursor';

export default LookAtCursor;
