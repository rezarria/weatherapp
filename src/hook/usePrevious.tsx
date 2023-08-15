import { useEffect, useRef } from 'react'

function usePrevious<T>(value: T, init: T | undefined = undefined) {
	const ref = useRef<T | undefined>(init)
	useEffect(() => {
		ref.current = value
	}, [value])
	return ref.current
}
export default usePrevious
