import { useState, useEffect, useRef } from 'react'

import useThrottleFn from '../useThrottleFn'
import useUnmount from '../useUnmount'
import { IDebounceOptions } from '../utils/lodash'

function useThrottle<T>(value: T, delay: number) {
  const [throttleVal, setThrottleVal] = useState<T>(value)

  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        setThrottleVal(value)
      }, delay);
    }
  }, [value, delay])

  useUnmount(() => {
    clearTimeout(timerRef.current)
    timerRef.current = null
  })

  return throttleVal
}

// has options throttle
function useThrottled<T>(value: T, options: IDebounceOptions) {
  const [throttleVal, setThrottleVal] = useState<T>(value)

  const { run } = useThrottleFn(() => {
    setThrottleVal(value)
  }, options)

  useEffect(() => {
    run()
  }, [value])

  return throttleVal
}

export {
  useThrottle
}
export default useThrottled