export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export function isUndefined(obj: any) {
  return typeof obj === 'undefined'
}
