// Canal Creative — Scroll Expansion Hero
// Design: Dark industrial-chic, orange accent (#ea580c), Barlow Condensed display font
// Mobile-optimized: uses requestAnimationFrame + momentum easing for butter-smooth touch.

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  // Raw target progress (0-1) driven by user input
  const [targetProgress, setTargetProgress] = useState(0);
  // Displayed progress — smoothed via spring for buttery feel
  const springProgress = useSpring(0, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });

  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Live spring value for derived styles
  const [liveProgress, setLiveProgress] = useState(0);

  const touchStartYRef = useRef(0);
  const touchLastYRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isExpandedRef = useRef(false);

  // Keep ref in sync with state to avoid stale closures in event handlers
  useEffect(() => {
    isExpandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  // Sync spring to target
  useEffect(() => {
    springProgress.set(targetProgress);
  }, [targetProgress, springProgress]);

  // Subscribe to spring updates for derived styles
  useEffect(() => {
    const unsub = springProgress.on('change', (v) => {
      setLiveProgress(v);
      if (v >= 0.98 && !isExpandedRef.current) {
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (v < 0.75) {
        setShowContent(false);
      }
    });
    return unsub;
  }, [springProgress]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Wheel handler (desktop)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isExpandedRef.current) {
        if (e.deltaY < 0 && window.scrollY <= 5) {
          setMediaFullyExpanded(false);
          setTargetProgress(0.9);
          e.preventDefault();
        }
        return;
      }
      e.preventDefault();
      setTargetProgress((prev) =>
        Math.min(Math.max(prev + e.deltaY * 0.001, 0), 1)
      );
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Touch handlers (mobile) — use velocity + momentum for smooth feel
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      touchLastYRef.current = e.touches[0].clientY;
      velocityRef.current = 0;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isExpandedRef.current) return;
      e.preventDefault();

      const currentY = e.touches[0].clientY;
      const delta = touchLastYRef.current - currentY;
      velocityRef.current = delta;
      touchLastYRef.current = currentY;

      setTargetProgress((prev) =>
        Math.min(Math.max(prev + delta * 0.004, 0), 1)
      );
    };

    const handleTouchEnd = () => {
      if (isExpandedRef.current) return;

      // Apply momentum: continue scrolling with decaying velocity
      let vel = velocityRef.current;
      const decay = () => {
        if (Math.abs(vel) < 0.3) return;
        vel *= 0.88; // friction coefficient
        setTargetProgress((prev) =>
          Math.min(Math.max(prev + vel * 0.004, 0), 1)
        );
        rafRef.current = requestAnimationFrame(decay);
      };
      rafRef.current = requestAnimationFrame(decay);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Prevent native scroll while animating
  useEffect(() => {
    const handleScroll = () => {
      if (!isExpandedRef.current) window.scrollTo(0, 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Derived layout values from live spring progress
  const vw = typeof window !== 'undefined' ? window.innerWidth : 390;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 844;

  const startW = isMobile ? Math.min(vw * 0.82, 320) : 340;
  const startH = isMobile ? Math.min(vh * 0.52, 440) : 420;
  const endW = isMobile ? vw * 1.02 : vw * 1.05;
  const endH = isMobile ? vh * 1.02 : vh * 1.05;

  const mediaWidth = startW + liveProgress * (endW - startW);
  const mediaHeight = startH + liveProgress * (endH - startH);
  const textTranslateX = liveProgress * (isMobile ? 120 : 150);
  const bgOpacity = 1 - liveProgress;
  const borderRadius = Math.max(0, 16 - liveProgress * 16);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Blurred background — fades out as image expands */}
          <div
            className="absolute inset-0 z-0"
            style={{ opacity: bgOpacity, willChange: 'opacity' }}
          >
            <img
              src={bgImageSrc}
              alt=""
              aria-hidden="true"
              className="w-screen h-screen object-cover object-center"
              style={{ filter: 'blur(2px) brightness(0.45)' }}
            />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center justify-start">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding image frame */}
              <div
                className="absolute top-1/2 left-1/2 overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: `${borderRadius}px`,
                  boxShadow: liveProgress < 0.95 ? '0 8px 60px rgba(0,0,0,0.7)' : 'none',
                  willChange: 'width, height, border-radius',
                }}
              >
                <img
                  src={mediaSrc}
                  alt={title || 'Canal Creative'}
                  className="w-full h-full object-cover"
                  style={{ willChange: 'transform' }}
                />
                {/* Overlay fades out as image expands */}
                <div
                  className="absolute inset-0 bg-black"
                  style={{ opacity: Math.max(0, 0.35 - liveProgress * 0.35) }}
                />
              </div>

              {/* Scroll hint — fades out quickly */}
              {liveProgress < 0.3 && (
                <div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                  style={{ opacity: 1 - liveProgress * 3.3 }}
                >
                  {date && (
                    <p className="text-xs text-orange-400 font-display font-bold uppercase tracking-widest">
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p className="text-zinc-400 text-xs font-medium">{scrollToExpand}</p>
                  )}
                  {/* Animated chevron */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                    className="text-orange-500 text-lg leading-none"
                  >
                    ↓
                  </motion.div>
                </div>
              )}

              {/* Title words that split apart */}
              <div
                className={`flex items-center justify-center text-center gap-3 w-full relative z-20 flex-col pointer-events-none select-none ${
                  textBlend ? 'mix-blend-difference' : ''
                }`}
                style={{ opacity: Math.max(0, 1 - liveProgress * 2.5) }}
              >
                <span
                  className="font-display font-black uppercase text-white leading-none"
                  style={{
                    fontSize: isMobile ? 'clamp(2.2rem, 11vw, 3.5rem)' : 'clamp(2.5rem, 6vw, 5rem)',
                    transform: `translateX(-${textTranslateX}vw)`,
                    textShadow: '0 2px 24px rgba(0,0,0,1)',
                    willChange: 'transform',
                  }}
                >
                  {firstWord}
                </span>
                <span
                  className="font-display font-black uppercase text-white leading-none"
                  style={{
                    fontSize: isMobile ? 'clamp(2.2rem, 11vw, 3.5rem)' : 'clamp(2.5rem, 6vw, 5rem)',
                    transform: `translateX(${textTranslateX}vw)`,
                    textShadow: '0 2px 24px rgba(0,0,0,1)',
                    willChange: 'transform',
                  }}
                >
                  {restOfTitle}
                </span>
              </div>
            </div>

            {/* Content revealed after full expansion */}
            <div
              className="flex flex-col w-full px-6 py-10 md:px-16 lg:py-20"
              style={{
                opacity: showContent ? 1 : 0,
                transition: 'opacity 0.6s ease',
                pointerEvents: showContent ? 'auto' : 'none',
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
