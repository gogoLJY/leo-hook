import { useRef, useEffect } from 'react'

function useTimeout(fn: () => void, delay: number | null | undefined) {
  const fnRef = useRef();

  fnRef.current = fn

  useEffect(() => {
    if (typeof delay !== 'number') {
      return
    }

    const timer = setTimeout(() => {
      fnRef.current?.()
    }, delay);

    return () => {
      clearTimeout(timer)
    }
  }, [])
}

export default useTimeout