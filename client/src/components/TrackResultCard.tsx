
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader } from 'lucide-react';

interface Track {
  video_id: string;
  title: string;
  artist: string;
  duration: string;
  thumbnail: string;
}

interface TrackResultCardProps {
  track: Track;
  onDownload: (videoId: string) => void;
  isDownloading: boolean;
}

export function TrackResultCard({ track, onDownload, isDownloading }: TrackResultCardProps) {
  const handleDownload = () => {
    onDownload(track.video_id);
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={track.thumbnail || '/placeholder.svg'}
              alt={`${track.title} thumbnail`}
              className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover ring-2 ring-slate-600"
            />
          </div>

          {/* Track Info */}
          <div className="flex-grow min-w-0">
            <h4 className="text-white font-semibold text-lg truncate">
              {track.title}
            </h4>
            <p className="text-slate-300 text-sm truncate">
              {track.artist}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-slate-400 text-xs bg-slate-700/50 px-2 py-1 rounded-full">
                {track.duration}
              </span>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex-shrink-0">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isDownloading ? (
                <>
                  <Loader className="w-4 h-4 mr-1 animate-spin" />
                  <span className="hidden sm:inline">Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Download</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
