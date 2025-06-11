
import axios from 'axios';

// Configure axios with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 30000,
});

export interface Track {
  video_id: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail: string;
}

export interface SearchParams {
  title: string;
  artist: string;
}

export interface DownloadProgress {
  video_id: string;
  status: 'queued' | 'downloading' | 'completed' | 'failed';
  progress?: number;
  filename?: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  artist: string;
  status: 'done' | 'downloading' | 'failed';
  source: string;
  date: string;
}

// Mock data for demonstration
const mockTracks: Track[] = [
  {
    video_id: 'abc123',
    title: "Stayin' Alive",
    artist: 'Bee Gees',
    duration: 213,
    thumbnail: 'https://i.ytimg.com/vi/abc123/hqdefault.jpg',
  },
  {
    video_id: 'def456',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: 200,
    thumbnail: 'https://i.ytimg.com/vi/def456/hqdefault.jpg',
  },
  {
    video_id: 'ghi789',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    duration: 233,
    thumbnail: 'https://i.ytimg.com/vi/ghi789/hqdefault.jpg',
  },
  {
    video_id: 'jkl012',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    duration: 269,
    thumbnail: 'https://i.ytimg.com/vi/jkl012/hqdefault.jpg',
  },
];

const mockHistory: HistoryItem[] = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', status: 'done', source: 'Spotify', date: '2024-06-09' },
  { id: '2', title: 'Watermelon Sugar', artist: 'Harry Styles', status: 'done', source: 'YouTube', date: '2024-06-08' },
  { id: '3', title: 'Levitating', artist: 'Dua Lipa', status: 'downloading', source: 'Spotify', date: '2024-06-08' },
  { id: '4', title: 'Good 4 U', artist: 'Olivia Rodrigo', status: 'done', source: 'YouTube', date: '2024-06-07' },
  { id: '5', title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', status: 'failed', source: 'Spotify', date: '2024-06-07' },
  { id: '6', title: 'Industry Baby', artist: 'Lil Nas X ft. Jack Harlow', status: 'done', source: 'YouTube', date: '2024-06-06' },
  { id: '7', title: 'Heat Waves', artist: 'Glass Animals', status: 'done', source: 'Spotify', date: '2024-06-06' },
  { id: '8', title: 'Anti-Hero', artist: 'Taylor Swift', status: 'done', source: 'YouTube', date: '2024-06-05' },
  { id: '9', title: 'As It Was', artist: 'Harry Styles', status: 'done', source: 'Spotify', date: '2024-06-05' },
  { id: '10', title: 'Bad Habit', artist: 'Steve Lacy', status: 'done', source: 'YouTube', date: '2024-06-04' },
  { id: '11', title: 'Running Up That Hill', artist: 'Kate Bush', status: 'done', source: 'Spotify', date: '2024-06-04' },
  { id: '12', title: 'First Class', artist: 'Jack Harlow', status: 'failed', source: 'YouTube', date: '2024-06-03' },
];

// Search for tracks
// export const searchTracks = async (params: SearchParams): Promise<Track[]> => {
//   try {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
//
//     // Filter mock data based on search params
//     const filtered = mockTracks.filter(track =>
//       track.title.toLowerCase().includes(params.title.toLowerCase()) ||
//       track.artist.toLowerCase().includes(params.artist.toLowerCase()) ||
//       params.title === '' || params.artist === ''
//     );
//
//     return filtered;
//   } catch (error) {
//     console.error('Search error:', error);
//     throw new Error('Failed to search tracks');
//   }
// };

export const searchTracks = async (params: SearchParams) => {
  const { title, artist } = params;
  try {
    const results = await api.post('/search', {

        title,
        artist
    });
    return results.data;
  }catch (error) {
    throw new Error('Failed to search tracks');
  }
}


// Get download history
export const getDownloadHistory = async (): Promise<HistoryItem[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockHistory;
  } catch (error) {
    console.error('History error:', error);
    throw new Error('Failed to get download history');
  }
};



// Start download
export const downloadTrack = async (videoId: string, title: string): Promise<void> => {
  try {
    await api.post('/download', {
      video_id: videoId,
      title: title,
    });
  } catch (error) {
    console.error('Download error:', error);
    throw new Error('Failed to start download');
  }
};

// Get download progress

// Get download progress

export const getDownloadProgress = async (videoId: string): Promise<DownloadProgress> => {
  try {
    const response = await api.get(`/progress/${videoId}`);

    // If we have a detail field, it means "not found" - consider it as queued
    if (response.data.detail) {
      return {
        video_id: videoId,
        status: 'queued',
        progress: 0
      };
    }

    // Check if download is done
    if (response.data.done) {
      return {
        video_id: videoId,
        status: 'completed',
        progress: 100
      };
    }

    // If we have progress field with ANSI color codes
    if (response.data.progress) {
      // Parse the progress value from the ANSI-colored string
      // Example: "\u001b[0;94m 11.9%\u001b[0m"
      const progressMatch = response.data.progress.match(/(\d+\.?\d*)/);
      const progressValue = progressMatch ? parseFloat(progressMatch[1]) : 0;

      // If progress is 100%, consider it completed
      if (progressValue >= 100) {
        return {
          video_id: videoId,
          status: 'completed',
          progress: 100
        };
      }

      return {
        video_id: videoId,
        status: 'downloading',
        progress: progressValue
      };
    }

    // If we have error field
    if (response.data.error) {
      return {
        video_id: videoId,
        status: 'failed',
        progress: 0
      };
    }

    // Default case - consider it as queued
    return {
      video_id: videoId,
      status: 'queued',
      progress: 0
    };

  } catch (error: any) {
    // If the error is 404, it means the download hasn't started yet
    if (error.response?.status === 404) {
      return {
        video_id: videoId,
        status: 'queued',
        progress: 0
      };
    }

    // For other errors, return failed status
    console.error('Progress error:', error);
    return {
      video_id: videoId,
      status: 'failed',
      progress: 0
    };
  }
};

