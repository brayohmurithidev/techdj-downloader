
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Track {
  video_id: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail: string;
}

interface SearchResultCardProps {
  track: Track;
  onDownload: (track: Track) => void;
  isDownloading: boolean;
}

export function SearchResultCard({ track, onDownload, isDownloading }: SearchResultCardProps) {
  const { toast } = useToast();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    onDownload(track);
    console.log(track.video_id);
    toast({
      title: "Download started",
      description: `${track.title} is being downloaded...`,
    });
  };

  return (
    <Card className="bg-slate-700/50 backdrop-blur-lg border-slate-600 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={track.thumbnail || '/placeholder.svg'}
          alt={`${track.title} thumbnail`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          ⏱ {formatDuration(track.duration)}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
          🎧 {track.title}
        </h3>
        <p className="text-slate-300 text-xs mb-3 line-clamp-1">
          {track.artist}
        </p>
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          size="sm"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium transition-all duration-200"
        >
          {isDownloading ? (
            <>
              <Loader className="w-3 h-3 mr-1 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-3 h-3 mr-1" />
              Download
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
