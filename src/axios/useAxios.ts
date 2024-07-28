import axios from 'axios';
import { PostType } from '../types/PostType';
import { API_URL } from '../utils/apiUrl';

export const getPosts = async () => {
	try {
		const { data } = await axios.get<PostType[]>(`${API_URL}/posts`);
		return data;
	} catch (error) {
		throw new Error('Error!');
	}
};

export const sendPost = async (sendPost: PostType) => {
	await axios.post(`${API_URL}/posts`, sendPost);
};
