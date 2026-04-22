"use client";

import { useLazyVideo } from "@/lib/use-lazy-video";

/* Client island for lazy-loaded <video> elements in server components.
   Defers network + metadata fetch until the element approaches the
   viewport. Drop-in for a plain <video src="..."> where the page is
   otherwise server-rendered. */
interface LazyVideoProps {
  src: string;
  rootMargin?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

export function LazyVideo({
  src,
  rootMargin,
  poster,
  autoPlay,
  loop,
  muted,
  playsInline,
  className,
  style,
  "aria-label": ariaLabel,
}: LazyVideoProps) {
  const { ref, videoProps } = useLazyVideo(src, rootMargin);
  return (
    <video
      ref={ref}
      {...videoProps}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      className={className}
      style={style}
      aria-label={ariaLabel}
    />
  );
}
