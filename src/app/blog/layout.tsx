import { ImageLightbox } from "@/components/blog/ImageLightbox";

/**
 * Blog layout — wraps every route under /blog (the index and all posts).
 *
 * Mounts <ImageLightbox /> once at the layout level so every blog post gets
 * click-to-zoom on figure images for free, with no per-post changes.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ImageLightbox />
    </>
  );
}
