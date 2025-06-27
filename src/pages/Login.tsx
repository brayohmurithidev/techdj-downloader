import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

export default function Login() {
  const handleSpotifyLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/auth/spotify/login";
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] px-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-black/60 backdrop-blur-lg shadow-xl border border-white/10 flex flex-col items-center space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight">
              Tech DJ's Crate
            </h1>
            <p className="text-sm text-zinc-400">
              Log in with Spotify to access your playlists and download tracks.
            </p>
          </div>

          <motion.button
              onClick={handleSpotifyLogin}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-[#1DB954] text-black font-medium py-3 px-4 shadow hover:bg-[#1ed760] transition"
          >
            <LogIn className="w-5 h-5" />
            <span>Login with Spotify</span>
          </motion.button>
        </div>
      </div>
  );
}