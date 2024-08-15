import { useEffect } from 'react';

interface InfiniteScrollProps {
	children: JSX.Element;
	handleAxios: () => void;
}

export default function InfiniteScrollV2({
	children,
	handleAxios,
}: InfiniteScrollProps) {
	// 쓰로틀 : 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것(스크롤이벤트)
	// 디바운싱 : 시간제한내에 마지막 호출만 실행)(인풋검색)
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
