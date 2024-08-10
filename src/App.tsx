import Carousel from './components/Carousel';

export default function App() {
	const data = [
		{
			id: 0,
			src: 'https://loremflickr.com/320/240?lock=1',
			alt: '0',
		},
		{
			id: 1,
			src: 'https://loremflickr.com/320/240?lock=2',
			alt: '1',
		},
		{
			id: 2,
			src: 'https://loremflickr.com/320/240?lock=3',
			alt: '2',
		},
		{
			id: 3,
			src: 'https://loremflickr.com/320/240?lock=4',
			alt: '3',
		},
		{
			id: 4,
			src: 'https://loremflickr.com/320/240?lock=5',
			alt: '4',
		},

		{
			id: 5,
			src: 'https://loremflickr.com/320/240?lock=6',
			alt: '5',
		},
		{
			id: 6,
			src: 'https://loremflickr.com/320/240?lock=7',
			alt: '6',
		},
		{
			id: 7,
			src: 'https://loremflickr.com/320/240?lock=8',
			alt: '7',
		},
		{
			id: 8,
			src: 'https://loremflickr.com/320/240?lock=9',
			alt: '8',
		},
		{
			id: 9,
			src: 'https://loremflickr.com/320/240?lock=10',
			alt: '9',
		},
	];
	return (
		<div>
			<Carousel imgList={data} />
		</div>
	);
}
