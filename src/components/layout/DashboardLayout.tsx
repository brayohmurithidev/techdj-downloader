import { LogOut, Music, Disc3, Home, Settings } from "lucide-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", icon: Home, to: "/dashboard" },
  { name: "Playlists", icon: Music, to: "/dashboard" },
  { name: "Settings", icon: Settings, to: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("spotify_token");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex dark bg-transparent text-zinc-200"
    >
      {/* Sidebar */}
      <aside className="w-20 md:w-56 flex flex-col border-r border-zinc-800 bg-[#161616] py-6 px-2 md:px-4">
        <div className="mb-8 flex items-center gap-2 md:gap-3 px-2">
          <Disc3 className="w-6 h-6 text-[#1db954]" />
          <span className="hidden md:inline text-lg font-semibold text-zinc-100 tracking-tight">TechDJ</span>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map(({ name, icon: Icon, to }) => (
            <Link
              key={name}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors ${location.pathname === to ? "bg-zinc-800 text-zinc-100" : ""}`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline text-sm font-medium">{name}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-zinc-800">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 bg-[#181818]">
          <span className="text-base font-semibold text-zinc-300 tracking-tight">TechDJ</span>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>DJ</AvatarFallback>
          </Avatar>
        </header>
        {/* Page content */}
        <main className="flex-1 p-6 md:p-10 bg-transparent">
          <Outlet />
        </main>
      </div>
    </motion.div>
  );
} 