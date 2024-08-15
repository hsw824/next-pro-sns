import axios, { AxiosRequestConfig } from 'axios';
import { PostType, ImageType } from '../types/PostType';
import { API_URL } from '../utils/apiUrl';
import { ERROR_MESSAGE } from '../utils/errorMessage';

const axiosConfig: AxiosRequestConfig = {
	baseURL: API_URL,
	skipDefaultHandler: false,
};
const client = axios.create(axiosConfig);

client.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status) {
			if (error.config?.skipDefaultHandler) {
				throw error;
			}
			switch (error.response.status) {
				case 400:
					console.log(ERROR_MESSAGE.INVALID_REQUEST);
					break;
				case 404:
					console.log(ERROR_MESSAGE.NOT_EXIST);
					break;
				case 500:
					console.log(ERROR_MESSAGE.SERVER_ERROR);
					break;
			}
		}
	},
);

export const getPosts = async () => {
	const { data } = await client.get<PostType[]>('/posts');
	return data;
};

export const getImages = async (postId: string) => {
	const { data } = await client.get<ImageType[]>('/images/${postId}');
	return data;
};

export const sendPost = async (sendPost: PostType) => {
	await client.post('/posts', sendPost);
};
