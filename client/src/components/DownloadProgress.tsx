
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, Download } from 'lucide-react';
import { getDownloadProgress, downloadTrack } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface DownloadProgressProps {
  videoId: string;
  title: string;
  onComplete: () => void;
}

export function DownloadProgress({ videoId, title, onComplete }: DownloadProgressProps) {
  const { toast } = useToast();

  // Start download when component mounts
  useEffect(() => {
    downloadTrack(videoId, title).then(() => {
      toast({
        title: "Download started",
        description: "Your track download has been queued.",
      });
    }).catch(() => {
      toast({
        title: "Download failed",
        description: "Failed to start download. Please try again.",
        variant: "destructive",
      });
      onComplete();
    });
  }, [videoId, toast, onComplete]);

  const { data: progress } = useQuery({
    queryKey: ['download-progress', videoId],
    queryFn: () => getDownloadProgress(videoId),
    refetchInterval: (data) =>
        data?.status === 'completed' || data?.status === 'failed'
            ? false  // Stop polling when completed or failed
            : 2000,  // Continue polling every 2 seconds otherwise
    refetchIntervalInBackground: true,
  });


  useEffect(() => {
    if (progress?.status === 'completed') {
      toast({
        title: "Download completed",
        description: "Your track has been downloaded successfully!",
      });
      onComplete();
    } else if (progress?.status === 'failed') {
      toast({
        title: "Download failed",
        description: "Failed to download the track. Please try again.",
        variant: "destructive",
      });
      onComplete();
    }
  }, [progress?.status, toast, onComplete]);

  const getStatusIcon = () => {
    switch (progress?.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'downloading':
        return <Download className="w-5 h-5 text-blue-400 animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusText = () => {
    switch (progress?.status) {
      case 'completed':
        return 'Completed';
      case 'downloading':
        return `Downloading... ${progress.progress || 0}%`;
      case 'queued':
        return 'Queued';
      default:
        return 'Starting...';
    }
  };

  return (
    <Card className="bg-slate-700/30 border-slate-600">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <p className="text-white font-medium">Track {videoId}</p>
              <p className="text-slate-300 text-sm">{getStatusText()}</p>
            </div>
          </div>
        </div>
        
        {progress?.status === 'downloading' && (
          <Progress 
            value={progress.progress || 0} 
            className="h-2 bg-slate-600"
          />
        )}
      </div>
    </Card>
  );
}
