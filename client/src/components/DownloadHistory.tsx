
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  artist: string;
  status: 'done' | 'downloading' | 'failed';
  source: string;
  date: string;
}

interface DownloadHistoryProps {
  historyData?: HistoryItem[];
}

export function DownloadHistory({ historyData = [] }: DownloadHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = historyData.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'done':
        return `${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`;
      case 'downloading':
        return `${baseClasses} bg-yellow-500/20 text-yellow-300 border border-yellow-500/30`;
      case 'failed':
        return `${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`;
      default:
        return `${baseClasses} bg-slate-500/20 text-slate-300 border border-slate-500/30`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">📜 Download History</h2>
        
        {historyData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-300">No download history yet. Start downloading some tracks!</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border border-slate-600 bg-slate-700/30">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-600 hover:bg-slate-700/50">
                    <TableHead className="text-slate-300 font-medium">Title</TableHead>
                    <TableHead className="text-slate-300 font-medium">Artist</TableHead>
                    <TableHead className="text-slate-300 font-medium">Status</TableHead>
                    <TableHead className="text-slate-300 font-medium">Source</TableHead>
                    <TableHead className="text-slate-300 font-medium">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((item) => (
                    <TableRow key={item.id} className="border-slate-600 hover:bg-slate-700/30">
                      <TableCell className="text-white font-medium">{item.title}</TableCell>
                      <TableCell className="text-slate-300">{item.artist}</TableCell>
                      <TableCell>
                        <span className={getStatusBadge(item.status)}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-300">{item.source}</TableCell>
                      <TableCell className="text-slate-300">{formatDate(item.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-slate-300">
                  Showing {startIndex + 1} to {Math.min(endIndex, historyData.length)} of {historyData.length} results
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-slate-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
