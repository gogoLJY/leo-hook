import { useState, useEffect } from 'react'

import useDebounceFn from '../useDebounceFn'
import { IDebounceOptions } from '../utils/lodash'

function useDebounce(value: any, delay: number) {
  const [debounceVal, setDebounceVal] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(value)
    }, delay);

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceVal
}

// has Options debounce
function useDebounced<T>(value: T, options: IDebounceOptions) {
  const [debounceVal, setDebounceVal] = useState<T>(value)

  const { run } = useDebounceFn(() => {
    setDebounceVal(value)
  }, options)

  useEffect(() => {
    run()
  }, [value])

  return debounceVal
}

export {
  useDebounce
}
export default useDebounced
