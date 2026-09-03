'use client';

import React, { useEffect, useRef } from 'react';

/**
 * ScrollAnimationBackground Component
 * Renders the 250-frame cinematic video animation fixed to the viewport background (z: -20).
 * Uses a dynamic Priority Queue Preloading Engine to load all 250 frames in the background
 * while prioritizing the user's active scroll window, guaranteeing butter-smooth local playback.
 * Includes a Scroll-Aware Network Throttle to pause background downloads during scroll events,
 * dedicating 100% of bandwidth to the active frame and avoiding frame drop/stutter.
 */
export default function ScrollAnimationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Persistent client-side cache of HTMLImageElements
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(250).fill(null));
  const loadingRef = useRef<Set<number>>(new Set());
  
  // Scroll network throttle flags
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const TOTAL_FRAMES = 250;
    const images = imagesRef.current;
    const loadingIndices = loadingRef.current;
    const CONCURRENCY = 12; // Highly optimized concurrent worker pool for HTTP/2

    let targetFrame = 0;
    let currentFrame = 0;
    let lastRenderedFrame = -1;
    let lastPrioritizedFrame = -1;
    let animationId: number;
    let preloadQueue: number[] = [];

    const getFramePath = (i: number) => {
      return `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`;
    };

    // Load a single frame asynchronously and register cache
    const loadFrame = (index: number) => {
      if (images[index] || loadingIndices.has(index)) return;

      loadingIndices.add(index);
      const img = new Image();
      img.decoding = 'async';
      img.src = getFramePath(index);
      
      img.onload = () => {
        images[index] = img;
        loadingIndices.delete(index);
        
        // Redraw immediately if this frame matches the active scroll index
        if (Math.round(currentFrame) === index) {
          drawFrame(currentFrame);
        }
        
        // Trigger next download in queue
        processQueue();
      };

      img.onerror = () => {
        loadingIndices.delete(index);
        processQueue();
      };
    };

    // Initialize the queue: start with frame 0, final frame, then middle frames sequentially
    preloadQueue.push(0);
    preloadQueue.push(TOTAL_FRAMES - 1);
    for (let i = 1; i < TOTAL_FRAMES - 1; i++) {
      preloadQueue.push(i);
    }

    // Process queue downloads up to concurrency capacity (throttled on active scrolling)
    const processQueue = () => {
      if (preloadQueue.length === 0) return;
      
      const isScrolling = isScrollingRef.current;
      const maxActive = isScrolling ? 4 : CONCURRENCY; // Limit sockets during active scroll events
      
      if (loadingIndices.size >= maxActive) return;

      const spots = maxActive - loadingIndices.size;
      for (let i = 0; i < spots; i++) {
        if (preloadQueue.length === 0) break;
        
        let targetIdx = -1;
        let queuePos = -1;
        
        if (isScrolling) {
          // While scrolling, focus ONLY on the immediate viewport neighborhood (+/- 3 frames)
          const rounded = Math.round(currentFrame);
          for (let q = 0; q < preloadQueue.length; q++) {
            const idx = preloadQueue[q];
            if (Math.abs(idx - rounded) <= 3) {
              targetIdx = idx;
              queuePos = q;
              break;
            }
          }
        } else {
          // Normal sequential background preloading
          targetIdx = preloadQueue[0];
          queuePos = 0;
        }

        // If scrolling and no immediate frame is queued, wait until user stops scrolling
        if (targetIdx === -1 || queuePos === -1) {
          break;
        }

        // Dequeue item
        preloadQueue.splice(queuePos, 1);

        if (images[targetIdx] || loadingIndices.has(targetIdx)) {
          i--;
          continue;
        }
        
        loadFrame(targetIdx);
      }
    };

    // Prioritize a window of frames around the active scroll location
    const prioritizeActiveWindow = (pivot: number) => {
      const roundedPivot = Math.round(pivot);
      const windowSize = 25; // Preload 25 frames ahead and behind current position
      
      const windowIndices: number[] = [];
      for (let offset = 0; offset <= windowSize; offset++) {
        // Look ahead
        const nextIdx = roundedPivot + offset;
        if (nextIdx < TOTAL_FRAMES && !images[nextIdx] && !loadingIndices.has(nextIdx)) {
          windowIndices.push(nextIdx);
        }
        // Look behind
        const prevIdx = roundedPivot - offset;
        if (prevIdx >= 0 && !images[prevIdx] && !loadingIndices.has(prevIdx)) {
          windowIndices.push(prevIdx);
        }
      }

      if (windowIndices.length === 0) return;

      // Extract window candidates from their current location in the queue
      const windowSet = new Set(windowIndices);
      preloadQueue = preloadQueue.filter(idx => !windowSet.has(idx));

      // Sort by proximity (closest to pivot first) and prepend to the front of the queue
      windowIndices.sort((a, b) => Math.abs(a - roundedPivot) - Math.abs(b - roundedPivot));
      preloadQueue.unshift(...windowIndices);

      // Instantly start downloading the prioritized frames
      processQueue();
    };

    // Find closest loaded frame in cache to serve as fallback
    const getClosestLoadedFrame = (target: number): HTMLImageElement | null => {
      let closestIdx = -1;
      let minDiff = Infinity;
      
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = images[i];
        if (img && img.complete && img.naturalWidth > 0) {
          const diff = Math.abs(i - target);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        }
      }
      
      return closestIdx !== -1 ? images[closestIdx] : null;
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      if (lastRenderedFrame >= 0) {
        drawFrame(lastRenderedFrame, true);
      }
    };

    const drawFrame = (index: number, force = false) => {
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(index)));
      if (frameIndex === lastRenderedFrame && !force) return;

      let imgToDraw = images[frameIndex];
      
      // If target image is not loaded yet, prioritize it and scan for closest loaded fallback
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        loadFrame(frameIndex);
        imgToDraw = getClosestLoadedFrame(frameIndex);
      }

      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = imgToDraw.naturalWidth || 1920;
      const ih = imgToDraw.naturalHeight || 1080;

      // Fit and crop calculations (behave like object-fit: cover while preserving aspect ratio)
      const scale = Math.max(cw / iw, ch / ih);
      const rw = iw * scale;
      const rh = ih * scale;
      
      const screenWidth = window.innerWidth;
      let ox = 0;

      if (screenWidth >= 1024) {
        // Desktop Landscape Composition profile (Approved original design baseline)
        const isWide = screenWidth > 1024;
        ox = isWide ? (cw - rw) / 2 + (cw * 0.09) : (cw - rw) / 2;
      } else {
        // Mobile and Tablet: Mathematical Focal-Point Alignment
        const fx = 0.70;
        const screenAlignX = screenWidth < 768 ? 0.76 : 0.68;
        ox = (cw * screenAlignX) - (rw * fx);
        ox = Math.max(cw - rw, Math.min(0, ox));
      }

      const oy = rh > ch ? 0 : (ch - rh) / 2;

      ctx.drawImage(imgToDraw, ox, oy, rw, rh);
      lastRenderedFrame = frameIndex;
    };

    const updateScrollProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const progress = Math.min(1, Math.max(0, scrollTop / docHeight));
      targetFrame = progress * (TOTAL_FRAMES - 1);
      
      // Activate scroll throttle to pause background loading
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        processQueue(); // Resume preloader
      }, 800);
    };

    const renderLoop = () => {
      updateScrollProgress();

      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.001) {
        const lerpFactor = window.innerWidth < 768 ? 0.24 : 0.20;
        currentFrame += diff * lerpFactor;
        drawFrame(currentFrame);
      }
      
      const roundedFrame = Math.round(currentFrame);
      if (roundedFrame !== lastPrioritizedFrame) {
        prioritizeActiveWindow(currentFrame);
        lastPrioritizedFrame = roundedFrame;
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    processQueue();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(document.body);
    }

    handleResize();
    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateScrollProgress);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#050305]">
      {/* Cinematic Animation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block object-cover" />
      
      {/* Radial vignette overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      
      {/* Dark left gradient scrim for high text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />
      
      {/* Soft depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/85 pointer-events-none" />
    </div>
  );
}
