import { ReactNode } from 'react';

const createResource = (promise: Promise<any>) => {
	return wrapPromise(promise);
};

function wrapPromise(promise: Promise<any>) {
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
}

export default function Suspense({
	fallback,
	children,
}: {
	fallback: ReactNode;
	children: ReactNode;
}) {
	// promise 객체가 반환되면 이를 캐치한다.
	// 캐치한 promise가 pending상태라면 fallback을 실행한다.
	// 캐치한 promise가 resolve상태라면 children을 보여준다.(children이 랜더링된다.)
	// 캐치한 promise가 rejected되고 error boundary가 실행된 상태라면 error boundary로 넘어간다.

	// 자식 컴포넌트가 여러개이고, 비동기가 여러개일때는 어떻게 조작?
	// 자식 컴포넌트의 비동기를 어떻게 catch?

	return <>{children}</>;
}
