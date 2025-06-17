import {useNavigate} from "react-router";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Music} from "lucide-react";
import {motion} from "framer-motion";
import {useQuery} from "@tanstack/react-query";
import api from "@/lib/axiosConfig.ts";


export default function Dashboard() {
  const navigate = useNavigate();

  const {data:playlists, isLoading:fetchingPlaylists, error:playlistError} = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await  api.get('/spotify/playlists')
      return response.data.playlists
    }
  })



  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-semibold text-zinc-100">Your Playlists</h1>
      </div>
      {fetchingPlaylists && (
          <div>Loading ....</div>
      )}
      {playlists && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
            <motion.div
                key={playlist.id}
                whileHover={{scale: 1.025}}
                transition={{type: "spring", stiffness: 300, damping: 22}}
                className="rounded-lg bg-zinc-900/80 border border-zinc-800 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Card className="bg-transparent shadow-none border-none">
                <CardHeader className="p-0">
                  <img
                      src={playlist.image}
                      alt={playlist.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <h3 className="text-lg font-medium text-zinc-100 truncate">{playlist.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{playlist.tracks} tracks</p>
                </CardContent>
                <CardFooter>
                  <Button
                      className="w-full text-sm font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                      onClick={() => navigate(`/playlist/${playlist.id}`)}
                  >
                    <Music className="w-4 h-4 mr-2 text-[#1db954]"/>
                    View Tracks
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
        ))}
      </div>}
    </motion.div>
  );
}