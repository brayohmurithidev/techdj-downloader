import {useParams} from "react-router";
import {Button} from "@/components/ui/button";
import {Download} from "lucide-react";
import {motion} from "framer-motion";
import {useQuery} from "@tanstack/react-query";
import api from "@/lib/axiosConfig.ts";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

// Mock data for tracks
// const mockTracks = [
//   {
//     id: "1",
//     name: "Summer Vibes",
//     artists: ["Artist 1", "Artist 2"],
//     duration: "3:45",
//   },
//   {
//     id: "2",
//     name: "Chill Beats",
//     artists: ["Artist 3"],
//     duration: "4:20",
//   },
//   {
//     id: "3",
//     name: "Workout Mix",
//     artists: ["Artist 4", "Artist 5"],
//     duration: "3:15",
//   },
// ];

export default function Playlist() {
  const {id} = useParams();

  const {data: tracks, isLoading: tracksFetching} = useQuery({
    queryKey: ["tracks", id],
    queryFn: async () => {
      const res = await api.get(`spotify/playlists/${id}/tracks`)
      return res.data.tracks
    },
    enabled: !!id
  })

  return (
      <motion.div
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.4, ease: "easeOut"}}
          className="space-y-8"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-semibold text-zinc-100">Tracks</h1>
        </div>
        {tracksFetching && (<div>Fetching tracks ...</div>)}
        {tracks && <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 overflow-hidden">
          <div className="divide-y divide-zinc-800">
            {tracks.map((track: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; artists: any[]; duration_formatted: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <div key={track.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-zinc-100 truncate">{track.name}</div>
                  <div className="text-xs text-zinc-400 truncate">{track.artists.join(", ")}</div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <span className="text-xs text-zinc-400 font-mono w-12 text-right">{track.duration_formatted}</span>
                  <motion.div
                      whileHover={{scale: 1.15}}
                      transition={{type: "spring", stiffness: 300, damping: 18}}
                  >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-[#1db954] focus:ring-0"
                    >
                      <Download className="w-5 h-5"/>
                    </Button>
                  </motion.div>
                </div>
              </div>
          ))}
        </div>
      </div>}
    </motion.div>
  );
} 