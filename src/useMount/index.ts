import { useRef, useEffect } from 'react'

function useMount(fn: () => void) {
  const fnRef = useRef();
  
  fnRef.current = fn

  useEffect(() => {
    if (fnRef.current && typeof fnRef.current === 'function') {
      fnRef.current()
    }
  }, [])
}

export default useMount