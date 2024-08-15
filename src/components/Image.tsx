import { useEffect, useRef, useState } from 'react';
import useIntersectionObserver from '../hook/useIntersectionObserver';

const ioOption: IntersectionObserverInit = {
	root: null,
	threshold: 0.5,
};

const MAX_TRY_COUNT = 3;

export default function ImageContainer({
	src,
	alt = '',
}: {
	src: string;
	alt?: string;
}) {
	const [tryCount, setTryCount] = useState(0);
	const [status, setStatus] = useState<'error' | 'load' | 'success'>('load');
	const imgRef = useRef<HTMLImageElement>(null);
	const { entries } = useIntersectionObserver(imgRef, ioOption);

	useEffect(() => {
		const isVisible = entries[0].isIntersecting;
		if (isVisible) {
			if (!imgRef.current) return;
			imgRef.current.src = src;
		}
	}, [entries, src]);

	// useEffect(() => {
	// 	// const img: HTMLImageElement = new Image();
	// 	if (!imgRef.current) return;
	// 	imgRef.current.src = src;

	// 	imgRef.current.onload = () => {
	// 		setStatus('success');
	// 	};

	// 	imgRef.current.onerror = () => {
	// 		if (tryCount < MAX_TRY_COUNT) {
	// 			setTryCount((prev) => prev + 1);
	// 			return;
	// 		}
	// 		setStatus('error');
	// 	};
	// }, [src, tryCount]);

	// if (status === 'load') return <div>이미지 로딩중</div>;
	// if (status === 'error') return <div>잘못된 이미지</div>;

	return <img alt={alt} ref={imgRef} />;
}
