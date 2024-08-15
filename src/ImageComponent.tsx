import Suspense from './Suspense';
import { useImages } from './utils/useImages';

export default function ImageComponent() {
	const { imgSrc } = useImages('postId');
	return (
		<Suspense fallback={<h1>suspense</h1>}>
			<section>
				{imgSrc.map((item) => {
					return <img src={item.postImgSrc} alt={item.postImgTitle} />;
				})}
			</section>
		</Suspense>
	);
}
