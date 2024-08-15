import { Suspense, useEffect, useRef } from 'react';

interface InfiniteScrollProps {
	children: JSX.Element;
	handleAxios: () => void;
}

export default function InfiniteScroll({
	children,
	handleAxios,
}: InfiniteScrollProps) {
	const target = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const option = {
			root: null,
			threshold: 0.5,
		};
		const handleObserver = (
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver,
		) => {
			const entry: IntersectionObserverEntry = entries[0];
			if (entry.intersectionRatio <= 0) {
				return;
			}
			if (!entry.isIntersecting) {
				return;
			}
			handleAxios();
			observer.unobserve(entry.target);
			observer.observe(target.current as HTMLDivElement);
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (target.current) observer.observe(target.current);
		return () => observer?.disconnect();
	}, []);
	return (
		<Suspense fallback={<h1>로딩중!</h1>}>
			<div>
				{children}
				<div ref={target}></div>
			</div>
		</Suspense>
	);
}
