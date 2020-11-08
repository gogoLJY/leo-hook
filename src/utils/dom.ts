import { MutableRefObject } from 'react'

import { isFunction } from './index'

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | undefined
  | MutableRefObject<T | null | undefined>;

export type ITargetElement = HTMLElement | Document | Window;

export type ITargetReturnType = ITargetElement | undefined | null

export function getTargetElement(target?: BasicTarget<ITargetElement>): ITargetReturnType {
  if (!target) {
    return
  }

  let targetElement: ITargetReturnType

  if (isFunction(target)) {
    targetElement = target()
  } else if ('current' in target) {
    targetElement = target as any
  } else {
    targetElement = target
  }
}