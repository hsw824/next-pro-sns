import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

const app = createRoot(document.getElementById('app') as HTMLElement);
app.render(
	<React.StrictMode>
		<ErrorBoundary fallback={<h1>잘못된 접근입니다!</h1>}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
);
