import { useState } from 'react'

import { IHoverOptions } from './type'
import { BasicTarget } from '../utils/dom'
import useEventListener from '../useEventListener'

function useHover(target: BasicTarget, options: IHoverOptions = {}) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  useEventListener(
    'mouseenter',
    (event: Event) => {
      options?.onEnter(event)
      setIsHovering(true)
    },
    {
      target
    }
  )

  useEventListener(
    'mouseleave',
    (event: Event) => {
      options?.onLeave(event)
      setIsHovering(false)
    },
    {
      target
    }
  )

  return isHovering
}

export default useHover