import { useState, useCallback } from 'react'
import Cookies from 'js-cookie'

import { ICookieOptions, ICookieValue } from './type'
import { isFunction } from '../utils'

function useCookie(key: string, defaultOptions: ICookieOptions = {}) {
  const [cookieValue, setCookieValue] = useState<ICookieValue>(() => Cookies.get(key))

  const updateCookie = useCallback((newValue: ICookieValue, newOptions: ICookieOptions = {}) => {
    
    setCookieValue((prevValue: ICookieValue) => {
      const currentValue = isFunction(newValue) ? newValue(prevValue) : newValue
      const currentOptions = {...defaultOptions, ...newOptions}

      if (currentValue === null || currentValue === undefined) {
        Cookies.remove(key)
      } else {
        Cookies.set(key, currentValue, currentOptions)
      }

      return currentValue
    })
  }, [key, defaultOptions])

  return [cookieValue, updateCookie]
}

export default useCookie