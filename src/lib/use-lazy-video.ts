"use client";

import { useEffect, useRef, useState } from "react";

/* IntersectionObserver-backed lazy video loader.
   Attach the returned ref to the <video> element and spread
   `...videoProps` in place of a plain `src="..."` attribute.
   The real src is withheld until the element enters (or nearly
   enters) the viewport, at which point the observer disconnects
   and the browser issues exactly one network request.

   Without this, <video preload="auto"> (the browser default for
   any src-bearing <video>) force-downloads the entire file on
   page load — so a 4 MB clip below the fold still saturates the
   bandwidth pipe before the user has seen it. */
export function useLazyVideo(
  src: string,
  rootMargin: string = "300px",
): {
  ref: React.RefObject<HTMLVideoElement | null>;
  videoProps: {
    src?: string;
    preload: "none" | "auto";
  };
} {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldLoad) return;

    // No IO support → fall back to loading immediately rather than
    // leaving the element permanently blank.
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad, rootMargin]);

  return {
    ref,
    videoProps: {
      src: shouldLoad ? src : undefined,
      preload: shouldLoad ? "auto" : "none",
    },
  };
}
