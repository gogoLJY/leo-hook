import { BasicTarget } from '../utils/dom'

export interface IOptions {
  target?: BasicTarget<HTMLElement | Document |Window>
  capture?: boolean
  once?: boolean;
  passive?: boolean;
}