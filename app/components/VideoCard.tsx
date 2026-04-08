"use client";
import { useState } from "react";

export default function VideoCard({ videoId, tag, tagClass, title, desc }: { videoId: string; tag: string; tagClass: string; title: string; desc: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="video-card" data-video-id={videoId}>
      {!loaded ? (
        <div className="video-thumbnail" onClick={() => setLoaded(true)} style={{ cursor: "pointer" }}>
          <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt={title}
            onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }} />
          <div className="play-overlay"><div className="play-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></div></div>
          <div className="video-duration">Demo</div>
        </div>
      ) : (
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          frameBorder="0" allowFullScreen allow="autoplay; encrypted-media; picture-in-picture" style={{ width: "100%", aspectRatio: "16/9", display: "block", border: "none" }} />
      )}
      <div className="video-info">
        <div className={`video-tag ${tagClass}`}>{tag}</div>
        <div className="video-title">{title}</div>
        <div className="video-desc">{desc}</div>
      </div>
    </div>
  );
}
