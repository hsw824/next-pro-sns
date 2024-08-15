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
			root: null, // 타겟 요소의 가시성을 확인 null일 경우 기본값으로 브라우저 뷰포트
			threshold: 0.5, // 타겟이 어느정도 보였을때 콜백을 실행시킬건지 0.5면 대략 50%만큼 보여졌을 때
		};

		// 가시성 변화가 감지되면 내가 지정해둔 threshold에 지정해둔대로 만나면 handleObserver가 실행된다.

		// entries : 정의하기 애매하네
		const handleObserver = (
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver,
		) => {
			const entry: IntersectionObserverEntry = entries[0];
			// 타겟 요소랑 루트 요소가 교차하는 점이 없으면 바로 return
			if (entry.intersectionRatio <= 0) {
				return;
			}

			// 지금 타깃요소랑 루트 요소가 교차하고 있음?
			if (!entry.isIntersecting) {
				return;
			}

			//children 그니까 실제 axios를 하는 컴포넌트에서 실행할 함수를 어떻게 실행시키지?
			// -> InfiniteScroll의 부모 컴포넌트에서 handleAxios를 보내주고 그 children 컴포넌트에 값을 넣어줌??

			handleAxios();

			observer.unobserve(entry.target);
			observer.observe(target.current as HTMLDivElement);
		};

		const observer = new IntersectionObserver(handleObserver, option);

		if (target.current) observer.observe(target.current);

		return () => observer?.disconnect();

		// isLoading을 사용했다면 dependency를 그걸로 설정해도 되는데 suspense를 쓰니까 dependency에 어떤걸 넣어줘야할지 모르겠다. -> 일단 isLoading으로 구현
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
