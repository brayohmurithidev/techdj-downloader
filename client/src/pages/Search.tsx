
import React from 'react';
import { SearchForm } from '@/components/SearchForm';
import { SearchResults } from '@/components/SearchResults';
import { DownloadHistory } from '@/components/DownloadHistory';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { searchTracks, getDownloadHistory } from '@/lib/api';
import {DownloadProgress} from "@/components/DownloadProgress.tsx";

interface DownloadingTrack {
  videoId: string;
  title: string;
}


export default function Search() {
  const [searchParams, setSearchParams] = useState<{ title: string; artist: string } | null>(null);
  const [downloadingTracks, setDownloadingTracks] = useState<Map<string, string>>(new Map());


  const { data: tracks, isLoading: isSearchLoading, error: searchError } = useQuery({
    queryKey: ['tracks', searchParams],
    queryFn: () => searchTracks(searchParams!),
    enabled: !!searchParams,
  });

  const { data: historyData } = useQuery({
    queryKey: ['downloadHistory'],
    queryFn: getDownloadHistory,
  });

  const handleSearch = (title: string, artist: string) => {
    setSearchParams({ title, artist });
  };

  const handleDownload = (track: Track) => {
    setDownloadingTracks(prev => new Map(prev).set(track.video_id, track.title));
  };

  const handleDownloadComplete = (videoId: string) => {
    setDownloadingTracks(prev => {
      const newMap = new Map(prev);
      newMap.delete(videoId);
      return newMap;
    });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Spotify Downloader
          </h1>
          <p className="text-slate-300 text-lg">
            Search and download your favorite tracks from Spotify
          </p>
        </div>

        <div className="space-y-8">
          {/* Search Section */}
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">🔍 Search Music</h2>
              <SearchForm onSearch={handleSearch} isLoading={isSearchLoading} />
            </div>
          </Card>

          {/* Active Downloads Section */}
          {downloadingTracks.size > 0 && (
              <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">📥 Active Downloads</h2>
                  <div className="space-y-4">
                    {Array.from(downloadingTracks.entries()).map(([videoId, title]) => (
                        <DownloadProgress
                            key={videoId}
                            videoId={videoId}
                            title={title}
                            onComplete={() => handleDownloadComplete(videoId)}
                        />
                    ))}
                  </div>
                </div>
              </Card>
          )}


          {/* Search Results Section */}
          <SearchResults
            tracks={tracks}
            isLoading={isSearchLoading}
            error={searchError}
            searchParams={searchParams}
            downloadingTracks={downloadingTracks}
            onDownload={handleDownload}
          />

          {/* Download History Section */}
          <DownloadHistory historyData={historyData} />
        </div>
      </div>
    </div>
  );
}
