import { motion } from "framer-motion";
import { LogIn, Music, Download, Play, Heart, Users, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSpotifyLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/auth/spotify/login";
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] px-4">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Don't show login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  const features = [
    {
      icon: Music,
      title: "Access Your Playlists",
      description: "Connect with Spotify and browse all your playlists in one place"
    },
    {
      icon: Download,
      title: "Download Tracks",
      description: "Download your favorite tracks for offline listening"
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Keep track of your most loved tracks and playlists"
    },
    {
      icon: Users,
      title: "Share & Collaborate",
      description: "Share playlists with friends and discover new music together"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-zinc-200">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1db954] rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-zinc-100">TechDJ</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#features" className="hover:text-zinc-100 transition-colors">Features</a>
            <a href="#about" className="hover:text-zinc-100 transition-colors">About</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#1db954] text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>Your Ultimate Music Companion</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-zinc-100 leading-tight">
                  Discover, Download & 
                  <span className="text-[#1db954]"> Enjoy</span>
                </h1>
                <p className="text-xl text-zinc-400 leading-relaxed">
                  Connect your Spotify account and unlock a world of music. Download your favorite tracks, 
                  organize playlists, and take your music anywhere.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleSpotifyLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 bg-[#1DB954] text-black font-semibold py-4 px-8 rounded-lg shadow-lg hover:bg-[#1ed760] transition-all duration-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login with Spotify</span>
                </motion.button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-3 py-4 px-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <Play className="w-5 h-5" />
                  <span>Learn More</span>
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#1db954] rounded-full"></div>
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#1db954] rounded-full"></div>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#1db954] rounded-full"></div>
                  <span>No ads</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl p-8 backdrop-blur-lg border border-zinc-700/50">
                <div className="space-y-4">
                  {/* Mock Playlist Item */}
                  <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-zinc-100">Liked Songs</h4>
                      <p className="text-sm text-zinc-400">1,247 songs</p>
                    </div>
                    <Download className="w-5 h-5 text-[#1db954]" />
                  </div>
                  
                  {/* Mock Playlist Item */}
                  <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-zinc-100">Chill Vibes</h4>
                      <p className="text-sm text-zinc-400">89 songs</p>
                    </div>
                    <Download className="w-5 h-5 text-[#1db954]" />
                  </div>
                  
                  {/* Mock Playlist Item */}
                  <div className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-zinc-100">Workout Mix</h4>
                      <p className="text-sm text-zinc-400">156 songs</p>
                    </div>
                    <Download className="w-5 h-5 text-[#1db954]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-zinc-400">
                Powerful features to enhance your music experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-zinc-800/30 rounded-xl border border-zinc-700/50 hover:border-zinc-600/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1db954]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[#1db954]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-zinc-400">
                Join thousands of music lovers who are already using TechDJ to enhance their music experience.
              </p>
              <motion.button
                onClick={handleSpotifyLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-[#1DB954] text-black font-semibold py-4 px-8 rounded-lg shadow-lg hover:bg-[#1ed760] transition-all duration-200"
              >
                <LogIn className="w-5 h-5" />
                <span>Start Your Music Journey</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#1db954] rounded flex items-center justify-center">
                <Music className="w-4 h-4 text-black" />
              </div>
              <span className="text-zinc-400">© 2024 TechDJ. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}