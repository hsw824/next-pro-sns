import { useImages } from './utils/useImages';

export default function ImageComponent() {
	const { imgSrc } = useImages('postId');
	return (
		<section>
			{imgSrc.map((item) => {
				return <img src={item.postImgSrc} alt={item.postImgTitle} />;
			})}
		</section>
	);
}
