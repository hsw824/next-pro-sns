import axios from 'axios';
import { PostType } from '../types/PostType';
import { API_URL } from '../utils/apiUrl';

export const getPosts = async () => {
	const { data } = await axios.get<PostType[]>(`${API_URL}/posts`);
	return data;
};

export const sendPost = async (sendPost: PostType) => {
	await axios.post(`${API_URL}/posts`, sendPost);
};
