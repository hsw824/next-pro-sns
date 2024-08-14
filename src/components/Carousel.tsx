import ImageContainer from './Image';
import styles from './Carousel.module.scss';
import { useEffect, useRef, useState } from 'react';
// import styles from './Carousel.module.scss';
// 버튼 생성
// 1. 전체 container 사이즈 조정
// 2. ul display flex overflow hidden
// 3. 개별 이미지 transform 적용
// 4. 마지막일때 첫번째로 가는것, 첫번째일때 마지막으로
// 지금 보이는것 +2개씩만 미리 로드하고 지연로딩하기
// 지연로딩은 사실상 image 컴포넌트에서 하는건가
// 버튼 하나씩 구현했다가 합칠 수 있게해서 합치고

// 다시
// 1번에서 왼쪽 버튼을 누르면 1~10번째거를 복사해서 1번의 앞쪽에 붙임
// 10번에서 오른쪽 버튼을 누르면 1~10을 복사해서 10번의 뒤쪽에 붙임
// or
// 하나씩만 처리한다 지금 내가 보이는것만 따져서 앞 뒤를 정해준다. 내가 보여지는게 끝나면 양 옆은 지우기
interface ImgListType {
	id: number;
	alt: string;
	src: string;
}

export default function Carousel({
	imgList,
	autoSlideSec,
}: {
	imgList: ImgListType[];
	autoSlideSec: number;
}) {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [carouselList, setCarouselList] = useState<ImgListType[]>([]);
	const $ul = useRef<null | HTMLUListElement>(null);
	const interval = useRef<null | NodeJS.Timeout>(null);

	useEffect(() => {
		if (imgList.length !== 0) {
			const startImg = imgList[0];
			const endImg = imgList[imgList.length - 1];
			const newImgList = [endImg, ...imgList, startImg];

			setCarouselList(newImgList);
		}
	}, [imgList]);

	useEffect(() => {
		if (!$ul.current) return;
		$ul.current.style.transform = `translateX(-${100 * currentIndex}%)`;
	}, [currentIndex]);

	const moveToSlide = (index: number) => {
		if (interval.current) {
			clearInterval(interval.current);
		}
		setTimeout(() => {
			setCurrentIndex(index);
			if (!$ul.current) return;
			$ul.current.style.transition = '';
			startAutoSlide();
		}, 500);
	};
	const handleSlider = (index: number) => {
		const newIndex = currentIndex + index;

		if (newIndex === imgList.length + 1) {
			moveToSlide(1);
		} else if (newIndex === 0) {
			console.log('111');
			moveToSlide(imgList.length);
		}
		setCurrentIndex((prev) => prev + index);

		if (!$ul.current) return;
		$ul.current.style.transition = 'all 0.5s ease-in-out';
	};

	const resetAutoSlide = () => {
		if (interval.current) {
			clearInterval(interval.current);
		}
	};

	const startAutoSlide = () => {
		interval.current = setInterval(() => {
			handleSlider(1);
		}, autoSlideSec * 1000);
	};
	useEffect(() => {
		startAutoSlide();
		return () => {
			if (interval.current) {
				clearInterval(interval.current);
			}
		};
	}, [autoSlideSec]);

	return (
		<div className={styles.container}>
			<button
				className={styles.btn}
				onClick={() => {
					resetAutoSlide();
					handleSlider(-1);
				}}
			>
				이전
			</button>
			<ul
				className={styles.carouselWrapper}
				ref={$ul}
				style={{
					transition: 'all 500ms',
				}}
			>
				{carouselList.map((item, index) => {
					return (
						<li key={index}>
							<ImageContainer src={item.src} alt={item.alt} />
							<span>#{index}</span>
						</li>
					);
				})}
			</ul>
			<button
				className={`${styles.btn} ${styles.next}`}
				onClick={() => {
					resetAutoSlide();
					handleSlider(1);
				}}
			>
				다음
			</button>
		</div>
	);
}
