import { useEffect, useRef } from 'react';
import useIntersectionObserver from '../hook/useIntersectionObserver';

const ioOption: IntersectionObserverInit = {
	threshold: 0,
};

export default function ImageContainer({
	src,
	alt = '',
}: {
	src: string;
	alt?: string;
}) {
	const imgRef = useRef<HTMLImageElement>(null);

	const { entries } = useIntersectionObserver(imgRef, ioOption);
	useEffect(() => {
		const isVisible = entries[0]?.isIntersecting;

		if (isVisible) {
			imgRef.current!.src = src;
		}
	}, [src, entries]);

	return <img ref={imgRef} alt={alt} />;
}
