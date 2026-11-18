import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ResilientImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectClass?: string;
}

export function ResilientImage({
  src,
  alt,
  caption,
  className = "",
  aspectClass = "aspect-video",
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 ${aspectClass}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 p-6 text-center text-slate-500">
            <ImageOff className="h-6 w-6 text-slate-400" aria-hidden="true" />
            <p className="max-w-xs text-xs font-medium text-slate-600">{alt}</p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs leading-relaxed text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
