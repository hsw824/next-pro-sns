import { useEffect, useState } from 'react';

const MAX_TRY_COUNT = 3;

export default function Image({
	src,
	alt = '',
}: {
	src: string;
	alt?: string;
}) {
	const [tryCount, setTryCount] = useState(0);
	const [status, setStatus] = useState<'error' | 'load' | 'success'>('load');
	useEffect(() => {
		const img: HTMLImageElement = new window.Image();

		img.src = src;

		img.onload = () => {
			setStatus('success');
		};

		img.onerror = () => {
			if (tryCount < MAX_TRY_COUNT) {
				setTryCount((prev) => prev + 1);
				console.log(tryCount);
				return;
			}
			setStatus('error');
		};
	}, [src, tryCount]);

	if (status === 'load') return <div>이미지 로딩중</div>;
	if (status === 'error') return <div>잘못된 이미지</div>;

	return <img src={src} alt={alt}></img>;
}
