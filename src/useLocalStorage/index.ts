import { useState, useCallback } from 'react'

import { isFunction, isUndefined } from '../utils'

function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  const [storageValue, setStorageValue] = useState(() => getStorageValue())

  const getStorageValue = useCallback(() => {
    const currentValue = localStorage.getItem(key)

    if (currentValue) {
      try {
        return JSON.parse(currentValue)        
      } catch (error) {
      }
    }

    if (isFunction(defaultValue)) {
      return defaultValue()
    }

    return defaultValue
  }, [key, defaultValue])

  const updateStorage = useCallback((newValue: T | ((prevValue?: any) => T)) => {
    if (isUndefined(newValue)) {
      localStorage.removeItem(key)
    } else if (isFunction(newValue)) {
      const prevValue = getStorageValue()
      const currentValue = newValue(prevValue)

      localStorage.setItem(key, JSON.stringify(currentValue))
      setStorageValue(currentValue)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
      setStorageValue(newValue)
    }
  }, [key])

  return [storageValue, updateStorage]
}

export default useLocalStorage