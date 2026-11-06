
"use client";

import dynamic from "next/dynamic";

const VideoPlayerClient = dynamic(
  () => import("./VideoPlayerClient"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-video rounded-2xl bg-gray-200 animate-pulse" />
    ),
  }
);

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  return <VideoPlayerClient {...props} />;
}
