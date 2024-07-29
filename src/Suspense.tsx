import { Component, ErrorInfo, ReactNode } from 'react';

interface SuspenseProps {
	fallback: React.ReactNode;
	children: React.ReactNode;
}

interface SuspenseState {
	pending: boolean;
	error?: any;
}

const wrapPromise = (promise: Promise<any>) => {
	let status: 'pending' | 'success' | 'error' = 'pending';

	let result: any;

	let suspender = promise.then(
		(resolve) => {
			(status = 'success'), (result = resolve);
		},
		(rejected) => {
			(status = 'error'), (result = rejected);
		},
	);

	return {
		read() {
			switch (status) {
				case 'pending':
					throw suspender;
				case 'success':
					throw result;
				//error boundary 호환
				case 'error':
					throw result;
			}
		},
	};
};

export const createResource = (promise: Promise<any>) => {
	return wrapPromise(promise);
};

function isPromise(item: any) {
	return item && item instanceof Promise;
}

class ReactSuspense extends Component<SuspenseProps, SuspenseState> {
	private mounted = false;

	state: SuspenseState = {
		pending: false,
	};

	constructor(props: SuspenseProps) {
		super(props);
	}

	public componentDidMount(): void {
		this.mounted = true;
	}

	public componentWillUnmount(): void {
		this.mounted = false;
	}
	public componentDidCatch(p: any): void {
		if (!this.mounted) return;
		if (isPromise(p.suspender)) {
			if (p.status === 'pending') {
				p.suspender.then(
					() => {
						this.state.pending && this.setState({ pending: false });
					},
					() => {
						throw new Error('요청 실패');
					},
				);
				this.setState({ pending: true });
			}
		}
	}
	public componentDidUpdate(): void {
		if (this.state.pending && this.state.error) {
			throw this.state.error;
		}
	}

	public render() {
		if (this.state.pending) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}

export default ReactSuspense;
