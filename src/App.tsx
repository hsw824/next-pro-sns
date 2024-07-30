import ImageComponent from './components/ImageComponent';
import { getPosts } from './axios/useAxios';

export default function App() {
	const data = getPosts();

	return <ImageComponent />;
}
