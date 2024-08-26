import Carousel from './components/Carousel';

export default function App() {
	const data = [
		{
			id: 0,
			src: 'https://loremflickr.com/600/320?lock=1',
			alt: '0',
		},
		{
			id: 1,
			src: 'https://loremflickr.com/600/320?lock=2',
			alt: '1',
		},
		{
			id: 2,
			src: 'https://loremflickr.com/600/320?lock=3',
			alt: '2',
		},
		{
			id: 3,
			src: 'https://loremflickr.com/600/320?lock=4',
			alt: '3',
		},
		{
			id: 4,
			src: 'https://loremflickr.com/600/320?lock=5',
			alt: '4',
		},
	];
	return (
		<div>
			<Carousel imgList={data} autoSlideSec={2} isAutoCarousel={true} />
		</div>
	);
}
