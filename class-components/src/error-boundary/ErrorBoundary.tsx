import type { ReactNode } from 'react';
import { Component } from 'react';

export type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = (): void => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h2>OOps</h2>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.resetError}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
