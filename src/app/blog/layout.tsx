import { ImageLightbox } from "@/components/blog/ImageLightbox";
import { ReadingRail } from "@/components/blog/ReadingRail";

/**
 * Blog layout — wraps every route under /blog (the index and all posts).
 *
 * Mounts two document-level helpers so every post gets them for free:
 *  - ImageLightbox: click-to-zoom on figure images.
 *  - ReadingRail: left-edge scroll-progress accent (renders nothing when
 *    there's no <article>, so the index page is untouched).
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ReadingRail />
      <ImageLightbox />
    </>
  );
}
