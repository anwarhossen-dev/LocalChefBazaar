import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-error-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">Something went wrong</h1>
              <p className="text-neutral-600 mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Refresh Page
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-neutral-200 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-300 transition-colors"
              >
                Go Home
              </button>
            </div>

            {import.meta.env.DEV && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-3 bg-neutral-100 rounded text-xs font-mono text-neutral-800 overflow-auto">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error && this.state.error.toString()}
                  </div>
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;