import React from 'react';

interface ErrorBoundaryProps {
	fallback: JSX.Element;
	children: JSX.Element;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.log(error, errorInfo);
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
