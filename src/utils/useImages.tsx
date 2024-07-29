import { useState, useEffect } from 'react';
import { getImages } from '../axios/useAxios';
import { ImageType } from '../types/PostType';

// 1. 이미지를 불러온다.
// 2. 실패 -> tryCount + 1함, 재시도 or 완전 실패 로직
// 3. 재시도 -> tryCount가 3을 초과하지 않으면 재시도
// 4. 완전 실패 -> tryCount가 3을 초과한 경우 기본 이미지 제공
// 5. 성공 -> 불러온 이미지 보이기

let tryCount = 0;

export const useImages = (postId: string) => {
	const [imgSrc, setImgSrc] = useState<ImageType[]>([]);
	const fetchImage = () => {
		const imgs = getImages(postId);
		imgs
			.then((data) => {
				setImgSrc((prev) => [...prev, ...data]);
				tryCount = 0;
			})
			.catch(() => {
				tryCount += 1;
				if (tryCount > 3) {
					console.log('err', tryCount);
					setImgSrc([
						{
							postId: '1',
							postImgSrc:
								'https://www.google.com/imgres?q=%EC%A7%B1%EA%B5%AC&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D100063510259456&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fgodjjanggu%2F&docid=aqntQvriGlJmWM&tbnid=dYLZyPahwU6apM&vet=12ahUKEwi33pSV_6-HAxUYslYBHXghBdUQM3oECFkQAA..i&w=1071&h=1066&hcb=2&ved=2ahUKEwi33pSV_6-HAxUYslYBHXghBdUQM3oECFkQAA',
							postImgTitle: '기본이미지',
						},
					]);
					tryCount = 0;
					return;
				}
				fetchImage();
			});
	};

	useEffect(() => {
		fetchImage();
	}, [postId]);

	return { imgSrc };
};
