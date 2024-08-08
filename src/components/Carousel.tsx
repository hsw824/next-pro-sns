import ImageContainer from './Image';
import './Carousel.scss';
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
interface ImgListType {
	id: number;
	alt: string;
	src: string;
}
export default function Carousel({ imgList }: { imgList: ImgListType[] }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [carouselList, setCarouselList] = useState<ImgListType[]>([]);
	const $ul = useRef<null | HTMLUListElement>(null);
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
		setCurrentIndex(index);
		if (!$ul.current) return;
		$ul.current.style.transition = '';
	};
	const handleSlider = (index: number) => {
		const newIndex = currentIndex + index;

		if (newIndex === carouselList.length + 1) {
			moveToSlide(1);
		} else if (newIndex === 0) {
			moveToSlide(carouselList.length);
		}
		setCurrentIndex((prev) => prev + index);

		if (!$ul.current) return;
		$ul.current.style.transition = 'all 0.5s ease-in-out';
	};

	return (
		<div className="container">
			<button className="btn" onClick={() => handleSlider(-1)}>
				이전
			</button>
			<ul
				className="carousel-wrapper"
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
			<button className="btn next" onClick={() => handleSlider(1)}>
				다음
			</button>
		</div>
	);
}
