import { RefObject, useEffect, useRef, useState } from 'react';

type Elem = Element | null;

const useIntersectionObserver = (
	elemRef: RefObject<Elem>,
	options: IntersectionObserverInit,
) => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
	useEffect(() => {
		const node = elemRef.current;
		const handleObserver = (entries: IntersectionObserverEntry[]) => {
			setEntries(entries);
		};
		if (!node) return;
		observerRef.current = new IntersectionObserver(handleObserver, options);
		observerRef.current.observe(node);
		return () => {
			if (!observerRef.current) return;
			observerRef.current.disconnect();
		};
	}, [elemRef, options]);
	return { entries, observerRef };
};

export default useIntersectionObserver;
