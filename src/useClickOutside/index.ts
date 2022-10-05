import { useEffect, useRef } from 'react'

import { BasicTarget, getTargetElement } from '../utils/dom'

export type IClickEvent = (event: MouseEvent) => void

function useClickOutside(
  onClickOutside: IClickEvent,
  target: BasicTarget | BasicTarget[],
  eventName: string = 'click'
) {

  const onClickOutsideRef = useRef<IClickEvent>();

  onClickOutsideRef.current = onClickOutside

  useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(target) ? target : [target]

      let isInnerClick = targets.some(targetItem => {
        let targetElement = getTargetElement(targetItem) as HTMLElement

        return !targetElement || targetElement?.contains(event.target)
      })

      if (isInnerClick) {
        return
      }

      onClickOutsideRef.current(event)
    }
    
    document.addEventListener(eventName, handler)

    return () => {
      document.removeEventListener(eventName, handler)
    }
  }, [])
}

export default useClickOutside