import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");
    
    if (token) {
      let parsedUser = undefined;
      
      if (userData) {
        try {
          parsedUser = JSON.parse(decodeURIComponent(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      login(token, parsedUser);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="lg" text="Processing login..." />
    </div>
  );
}