import React from 'react';

interface ErrorBoundaryProps {
	fallback: JSX.Element;
	children: JSX.Element;
}

interface ErrorBoundaryState {
	hasError: boolean;
}
// ErrorBoundary는 1. 이벤트 핸들러 2. 비동기 코드(setTimeout) 3.서버 사이드 렌더링 4. ErrorBoundary 컴포넌트의 자체 에러 는 에러를 핸들링하지 않는다.
class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}
	// 오류에 대한 응답으로 상태를 업데이트하고 사용자에게 오류때 보일 화면을 표시할 수 있는 기능과 함께 사용됨
	static getDerivedStateFromError() {
		return { hasError: true };
	}

	// 오류를 기록하는 로직을 작성할 수 있다. 일단 console.log만
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
