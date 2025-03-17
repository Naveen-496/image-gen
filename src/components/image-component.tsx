"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/use-chat";
const imageUrl = "/generated-images/image-1742196906084.png";
interface ImageComponentProps {
  src?: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const ImageComponent = ({
  src = imageUrl,
  alt,
  caption,
  className,
  width = 350,
  height = 350,
  priority = false,
}: ImageComponentProps) => {
  const [error, setError] = useState<string | null>(null);

  const { imageUrl, isSubmitting } = useChat();

  useEffect(() => {
    // Reset states when src changes
    setError(null);
  }, [imageUrl]);

  return (
    <figure className="relative flex flex-col items-center">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-border bg-muted shadow-sm",
          className
        )}
        style={{ width: width, height: isSubmitting ? height : "auto" }}
      >
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
            <p className="text-sm text-destructive">Failed to load image</p>
            <p className="mt-2 text-xs text-muted-foreground">{error}</p>
          </div>
        ) : (
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={cn(
              "object-cover transition-opacity duration-300",
              isSubmitting ? "opacity-0" : "opacity-100"
            )}
            // onLoad={() => setIsLoading(false)}
            onError={() => {
              //   setIsLoading(false);
              setError("Failed to load image. Please try again.");
            }}
          />
        )}
      </div>

      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
