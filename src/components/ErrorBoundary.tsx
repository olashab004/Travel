import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-12 text-center space-y-8 border border-gray-100">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 text-red-600 animate-pulse">
              <AlertCircle size={48} />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Something went wrong</h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                We encountered an unexpected error. Don't worry, your data is safe.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="p-4 bg-red-50 rounded-2xl text-left overflow-auto max-h-40 border border-red-100">
                <p className="text-xs font-mono text-red-700 break-words">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                Try Refreshing
              </button>
              
              <button
                onClick={this.handleReset}
                className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Go Back Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
