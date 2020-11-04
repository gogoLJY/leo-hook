import { useRef, useMemo } from 'react'

import { IOptionsFunc } from './type'
import { debounce, IDebounceOptions } from '../utils/lodash'

function useDebounceFn<T extends IOptionsFunc>(fn: T, options?: IDebounceOptions) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn

  const debounced = useMemo(() => {
    return debounce((...args: any[]) => {
      return fnRef.current(...args)
    }, options)
  }, [fnRef, options])

  return {
    run: debounced,
    cancel: debounced.cancel
  }
}

export default useDebounceFn