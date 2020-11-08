import { useRef, useEffect } from 'react'

function useInterval(fn: () => void, delay: number | null | undefined, options?: { immediate: boolean }) {
  const fnRef = useRef<() => void>();

  fnRef.current = fn

  useEffect(() => {
    if (typeof delay !== 'number') {
      return
    }

    if (options?.immediate) {
      fnRef.current?.()
    }

    const timer = setInterval(() => {
      fnRef.current?.()
    }, delay);

    return () => {
      clearInterval(timer)
    }
  }, [])
}

export default useInterval