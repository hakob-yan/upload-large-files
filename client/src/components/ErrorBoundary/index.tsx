import { Component, ErrorInfo } from "react";
import { State, Props } from "./types"

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return <div className='error-wrapper'><h1>Something went wrong. Please try again later.</h1></div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;