import ImageContainer from './Image';
import styles from './Carousel.module.scss';
import { useEffect, useRef, useState } from 'react';

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
			// startAutoSlide();
		}, 500);
	};
	const handleSlider = (index: number) => {
		const newIndex = currentIndex + index;

		if (newIndex === imgList.length + 1) {
			moveToSlide(1);
		} else if (newIndex === 0) {
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
	// useEffect(() => {
	// 	startAutoSlide();
	// 	return () => {
	// 		if (interval.current) {
	// 			clearInterval(interval.current);
	// 		}
	// 	};
	// }, [autoSlideSec]);

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
			<ul className={styles.carouselWrapper} ref={$ul}>
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
