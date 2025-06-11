
import React from 'react';
import { SearchResultCard } from '@/components/SearchResultCard';
import { Card } from '@/components/ui/card';

interface Track {
  video_id: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail: string;
}

interface SearchResultsProps {
  tracks?: Track[];
  isLoading: boolean;
  error: any;
  searchParams: { title: string; artist: string } | null;
  downloadingTracks: Map<string, string>;
  onDownload: (track: Track) => void;

}

export function SearchResults({ 
  tracks, 
  isLoading, 
  error, 
  searchParams, 
  downloadingTracks, 
  onDownload 
}: SearchResultsProps) {
  if (error) {
    return (
      <Card className="bg-red-900/20 backdrop-blur-lg border-red-700">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">🎵 Search Results</h2>
          <p className="text-red-300">Error searching for tracks. Please try again.</p>
        </div>
      </Card>
    );
  }

  if (!searchParams && !isLoading) {
    return null;
  }

  return (
    <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">🎵 Search Results</h2>
        
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          </div>
        )}

        {tracks && tracks.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tracks.map((track) => (
              <SearchResultCard
                key={track.video_id}
                track={track}
                onDownload={onDownload}
                isDownloading={downloadingTracks.has(track.video_id)}
              />
            ))}
          </div>
        )}

        {searchParams && !isLoading && tracks?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-300">No tracks found. Try a different search.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
