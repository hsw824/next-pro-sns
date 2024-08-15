import { useEffect } from 'react';

interface InfiniteScrollProps {
	children: JSX.Element;
	handleAxios: () => void;
}

export default function InfiniteScrollV2({
	children,
	handleAxios,
}: InfiniteScrollProps) {
	const throttle = (func: () => void, delay: number) => {
		let timerId: ReturnType<typeof setTimeout> | null;
		return () => {
			if (timerId) return;
			timerId = setTimeout(() => {
				func();
				timerId = null;
			}, delay);
		};
	};

	const onScroll = throttle(() => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			handleAxios();
		}
	}, 200);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});
	return <div>{children}</div>;
}
