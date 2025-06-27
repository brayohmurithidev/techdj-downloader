import{ Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AuthErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Auth error caught by boundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleLogout = () => {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    window.location.href = '/login';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] px-4">
          <div className="w-full max-w-md p-8 rounded-2xl bg-black/60 backdrop-blur-lg shadow-xl border border-white/10 flex flex-col items-center space-y-6">
            <div className="text-center space-y-2">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-zinc-100">
                Authentication Error
              </h1>
              <p className="text-sm text-zinc-400">
                Something went wrong with your authentication. Please try again or log in again.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              
              <Button
                variant="outline"
                onClick={this.handleLogout}
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 