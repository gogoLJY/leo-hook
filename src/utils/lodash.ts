export interface IDebounceOptions {
  wait?: number
  leading?: boolean;
  trailing?: boolean;
  immediate?: boolean
}

export function debounce(func: Function, options: IDebounceOptions = {}) {
  const { immediate, wait } = options
  let timer, context, args, result
  
  function debounced () {
    context = this
    args = arguments

    timer && clearTimeout(timer)

    if (immediate) {
      let callNow = !timer

      timer = setTimeout(() => {
        timer = null
      }, wait);

      if (callNow) {
        func.apply(context, args)
      }
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}

export function getNow() {
  return new Date().getTime()
}

export function throttle(func: Function, options: IDebounceOptions = {}) {
  let timer, context, args, result
  let previous = 0
  const { wait, leading, trailing } = options

  function later() {
    previous = leading === false ? 0 : getNow()
    timer = null

    func.apply(context, args)

    context = args = null
  }

  function throttled() {
    context = this
    args = arguments
    let now = getNow()

    if (!previous && leading === false) {
      previous = now
    }

    let remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      previous = now
      result = func.apply(context, args)
      context = args = null
    } else if (!timer && trailing !== false) {
      timer = setTimeout(later, remaining)
    }

    return result
  }

  throttled.cancel = function() {
    clearTimeout(timer)
    timer = null
    previous = 0
  }

  return throttled
}