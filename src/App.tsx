import { getPosts } from './axios/useAxios';

export default function App() {
	const data = getPosts();
	return <div>hello world</div>;
}
