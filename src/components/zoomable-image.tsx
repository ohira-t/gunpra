"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useCallback, useState } from "react";

export function ZoomableImage({
  src,
  alt,
  aspectRatio = "5 / 7",
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
}) {
  const [showHint, setShowHint] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const handleZoomChange = useCallback(() => {
    setShowHint(false);
  }, []);

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-white"
      style={{ aspectRatio, maxHeight: "60vh" }}
    >
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={5}
        centerOnInit
        onZoom={handleZoomChange}
        onPanning={handleZoomChange}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{ width: "100%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          />
        </TransformComponent>
      </TransformWrapper>
      {showHint && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          ピンチで拡大できます
        </div>
      )}
    </div>
  );
}
