"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";

export interface BeforeAfterPair {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
}

interface BeforeAfterSliderProps {
  pairs: BeforeAfterPair[];
}

/**
 * Interactive before/after comparison slider with a draggable handle, plus
 * prev/next controls to move between multiple job examples (a light carousel).
 *
 * Accessibility: the handle is a role="slider" with arrow-key support and
 * proper aria-value attributes.
 */
export function BeforeAfterSlider({ pairs }: BeforeAfterSliderProps) {
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(50); // % revealed of the "before" image
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const pair = pairs[index];

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(0, p - 5));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(100, p + 5));
      e.preventDefault();
    }
  };

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + pairs.length) % pairs.length);
    setPosition(50);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl bg-surface shadow-xl ring-1 ring-black/5 dark:ring-white/10 sm:aspect-[16/10]"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* AFTER image (full, underneath) */}
        <Image
          src={pair.afterSrc}
          alt={pair.afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          draggable={false}
        />
        <span className="absolute right-3 top-3 z-10 rounded-full bg-gold px-3 py-1 text-xs font-600 text-white shadow">
          After
        </span>

        {/* BEFORE image (clipped from the left up to `position`) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={pair.beforeSrc}
            alt={pair.beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            draggable={false}
          />
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-600 text-white shadow">
            Before
          </span>
        </div>

        {/* Divider + draggable handle */}
        <div
          className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]"
          style={{ left: `${position}%` }}
        >
          <button
            type="button"
            role="slider"
            aria-label={`Drag to compare before and after: ${pair.label}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            onPointerDown={onPointerDown}
            onKeyDown={onKeyDown}
            className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-ink shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Carousel controls */}
      {pairs.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous example"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-white/20 text-ink dark:text-white transition-colors hover:bg-gray-100 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Job examples">
            {pairs.map((p, i) => (
              <button
                key={p.label}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show example: ${p.label}`}
                onClick={() => {
                  setIndex(i);
                  setPosition(50);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "w-2.5 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next example"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-white/20 text-ink dark:text-white transition-colors hover:bg-gray-100 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}

      <p className="mt-3 text-center text-sm font-600 text-gray-500 dark:text-white/60">{pair.label}</p>
    </div>
  );
}
