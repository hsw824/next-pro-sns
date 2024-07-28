import { getPosts } from './axios/useAxios';

export default function App() {
	const data = getPosts();
	const aa = '';
	if (!aa) throw Error('??');
	return <div>hello world</div>;
}
