
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Loader } from 'lucide-react';

interface SearchFormProps {
  onSearch: (title: string, artist: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() || artist.trim()) {
      onSearch(title.trim(), artist.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white font-medium">
            🎵 Song Title
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter song title..."
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="artist" className="text-white font-medium">
            🎤 Artist
          </Label>
          <Input
            id="artist"
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Enter artist name..."
            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || (!title.trim() && !artist.trim())}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Search Tracks
          </>
        )}
      </Button>
    </form>
  );
}
