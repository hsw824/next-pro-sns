import 'axios';

declare module 'axios' {
	export interface AxiosRequestConfig {
		skipDefaultHandler?: boolean;
	}
}
