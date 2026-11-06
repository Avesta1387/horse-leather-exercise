
"use client";

import {
  Video,
  VideoPlayer as Player,
  VideoSkin,
} from "@videojs/react/video";

import "@videojs/react/video/skin.css";

interface VideoPlayerClientProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayerClient({
  src,
  poster,
  className = "",
}: VideoPlayerClientProps) {
  return (
    <Player poster={poster}>
      <VideoSkin className={`w-full aspect-video ${className}`}>
        <Video src={src} playsInline />
      </VideoSkin>
    </Player>
  );
}
