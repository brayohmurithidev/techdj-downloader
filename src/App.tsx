import {Navigate, Route, Routes} from "react-router";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Playlist from "./pages/Playlist";
import {useEffect} from "react";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-zinc-200">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Protected routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="playlist/:id" element={<Playlist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
