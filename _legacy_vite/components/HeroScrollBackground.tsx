import React, { useCallback, useEffect, useRef } from 'react';

export const HERO_FRAME_COUNT = 180;
export const HERO_FRAME_FPS = 30;
/** Scroll distance (px) per frame — 180 frames ≈ 6s at 30fps feel */
export const HERO_SCROLL_PX_PER_FRAME = 12;

export function getHeroFrameUrl(frameIndex: number): string {
  const clamped = Math.min(HERO_FRAME_COUNT, Math.max(1, frameIndex));
  return `/180Frames/frame_${String(clamped).padStart(3, '0')}.jpg`;
}

interface HeroScrollBackgroundProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  ready?: boolean;
  fallbackSrc?: string;
  className?: string;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const imageRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = width / height;

  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;

  if (imageRatio > canvasRatio) {
    sw = img.naturalHeight * canvasRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasRatio;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
}

const HeroScrollBackground: React.FC<HeroScrollBackgroundProps> = React.memo(
  ({ sectionRef, ready = true, fallbackSrc, className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
    const frameRef = useRef(1);
    const rafRef = useRef<number | null>(null);
    const fallbackDrawnRef = useRef(false);

    const getFrameImage = useCallback((index: number) => {
      const cached = cacheRef.current.get(index);
      if (cached) return cached;

      const img = new Image();
      img.decoding = 'async';
      img.src = getHeroFrameUrl(index);
      cacheRef.current.set(index, img);
      return img;
    }, []);

    const drawFrame = useCallback(
      (frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = getFrameImage(frameIndex);
        const render = () => {
          if (!img.naturalWidth) return;
          drawCover(ctx, img, canvas.width, canvas.height);
        };

        if (img.complete && img.naturalWidth) {
          render();
        } else {
          img.onload = render;
        }

        for (let offset = -4; offset <= 4; offset++) {
          const neighbor = frameIndex + offset;
          if (neighbor >= 1 && neighbor <= HERO_FRAME_COUNT) {
            getFrameImage(neighbor);
          }
        }
      },
      [getFrameImage]
    );

    const updateFromScroll = useCallback(() => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight);
      const scrolled = window.scrollY - sectionTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      const frameIndex = Math.min(
        HERO_FRAME_COUNT,
        Math.max(1, Math.round(progress * (HERO_FRAME_COUNT - 1)) + 1)
      );

      if (frameIndex !== frameRef.current) {
        frameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    }, [sectionRef, drawFrame]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(frameRef.current);
      };

      resize();
      window.addEventListener('resize', resize, { passive: true });
      return () => window.removeEventListener('resize', resize);
    }, [drawFrame]);

    useEffect(() => {
      if (!ready) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion && fallbackSrc && !fallbackDrawnRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
          const img = new Image();
          img.src = fallbackSrc;
          img.onload = () => {
            drawCover(ctx, img, canvas.width, canvas.height);
            fallbackDrawnRef.current = true;
          };
        }
        return;
      }

      getFrameImage(1);
      drawFrame(1);
      updateFromScroll();

      let preloadIndex = 2;
      const preloadBatch = () => {
        for (let i = 0; i < 15 && preloadIndex <= HERO_FRAME_COUNT; i++, preloadIndex++) {
          getFrameImage(preloadIndex);
        }
        if (preloadIndex <= HERO_FRAME_COUNT) {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(preloadBatch, { timeout: 2000 });
          } else {
            setTimeout(preloadBatch, 120);
          }
        }
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(preloadBatch, { timeout: 2000 });
      } else {
        setTimeout(preloadBatch, 300);
      }

      const onScroll = () => {
        if (rafRef.current !== null) return;
        rafRef.current = requestAnimationFrame(() => {
          updateFromScroll();
          rafRef.current = null;
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      };
    }, [ready, drawFrame, updateFromScroll, getFrameImage, fallbackSrc]);

    return (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full z-0 select-none pointer-events-none ${className}`}
      />
    );
  }
);

HeroScrollBackground.displayName = 'HeroScrollBackground';

export default HeroScrollBackground;
