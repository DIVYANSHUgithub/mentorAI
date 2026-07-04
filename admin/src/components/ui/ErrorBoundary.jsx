import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-lg w-full bg-white border border-rose-200 rounded-2xl p-6">
            <h1 className="text-lg font-semibold text-rose-600">Something went wrong</h1>
            <p className="text-sm text-slate-600 mt-2">
              The admin panel hit an error while loading. Try refreshing the page.
            </p>
            <pre className="mt-4 p-3 bg-slate-100 rounded-lg text-xs text-slate-700 overflow-auto">
              {this.state.error?.message || String(this.state.error)}
            </pre>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
