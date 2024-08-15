import axios from 'axios';
import { PostType, ImageType } from '../types/PostType';
import { API_URL } from '../utils/apiUrl';

export const getPosts = async () => {
	const { data } = await axios.get<PostType[]>(`${API_URL}/posts`);
	return data;
};

export const getImages = async (postId: string) => {
	const { data } = await axios.get<ImageType[]>(`${API_URL}/images/${postId}`);
	return data;
};

export const sendPost = async (sendPost: PostType) => {
	await axios.post(`${API_URL}/posts`, sendPost);
};
