import { useEffect, useRef } from 'react'

import { IOptions } from './type'
import { getTargetElement } from '../utils/dom'

function useEventListener(eventName: string, handler: Function, options: IOptions = {}) {
  const handlerRef = useRef<Function>();

  handlerRef.current = handler

  useEffect(() => {
    const { target, ...restOptions } = options

    const currentTarget = getTargetElement(target) ?? window

    const eventHandler = (event: Event) => {
      handlerRef.current?.(event)
    }

    currentTarget.addEventListener(eventName, eventHandler, restOptions)

    return () => {
      currentTarget.removeEventListener(eventName, eventHandler, restOptions)
    }
  }, [eventName])
}

export default useEventListener