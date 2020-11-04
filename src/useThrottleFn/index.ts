import { useRef, useMemo } from 'react'

import { throttle, IDebounceOptions } from '../utils/lodash'

function useThrottle<T extends Function>(fn: T, options: IDebounceOptions) {
  const fnRef = useRef<T>();

  fnRef.current = fn

  const throttled = useMemo(() => {
    return throttle((...args: any[]) => {
      return fnRef.current(...args)
    }, options)
  }, [fnRef, options])

  return {
    run: throttled,
    cancel: throttled.cancel
  }
}

export default useThrottle