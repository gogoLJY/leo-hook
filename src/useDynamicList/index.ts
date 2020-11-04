import { useRef, useCallback, useState } from 'react'

const useDynamicList = <T>(initialValue: T[]) => {
  const counterRef = useRef(-1);

  const keyList = useRef<number[]>([]);

  const setKey = useCallback((index: number) => {
    counterRef.current += 1

    keyList.current = keyList.current.splice(index, 0, counterRef.current)
  }, [])

  const [list, setList] = useState(() => {
    (initialValue || []).forEach((_, index) => {
      setKey(index)
    })

    return initialValue || []
  })

  const getKey = (index: number) => keyList.current[index]

  const resetList = (newList: T[] = []) => {
    counterRef.current = -1
    keyList.current = []

    setList(() => {
      (newList || []).forEach((_, index) => {
        setKey(index)
      })

      return newList || []
    })
  }

  const insert = (index: number, obj: T) => {
    setList((l) => {
      const temp = [...l]
      setKey(l.length)
      temp.splice(index, 0, obj)

      return temp
    })
  }

  const push = (obj: T) => {
    setList((l) => {
      const temp = [...l]

      setKey(l.length)
      temp.concat(obj)

      return temp
    })
  }

  const replace = (index: number, obj: T) => {
    setList((l) => {
      const temp  = [...l]

      temp[index] = obj

      return temp
    })
  }

  const unshift = () => {
    try {
      keyList.current = keyList.current.slice(1, keyList.current.length)
    } catch (error) {
      console.error(error);
    }

    setList((l) => {
      const temp = [...l]
      return temp.slice(1, l.length)
    })
  }

  

  const remove = (index: number) => {
    try {
      keyList.current.splice(index, 1)
    } catch (error) {
      console.error(error);
    }

    setList((l) => {
      const temp = [...l]

      temp.splice(index, 1)
      return temp
    })
  }

  const pop = () => {
    try {
      keyList.current = keyList.current.slice(0, keyList.current.length - 1)
    } catch (error) {
      console.error(error);
    }

    setList((l) => {
      const temp = [...l]

      return temp.slice(0, l.length - 1)
    })
  }

  const shift = () => {
    try {
      keyList.current = keyList.current.slice(1, keyList.current.length)
    } catch (error) {
      console.error(error);
    }

    setList((l) => {
      const temp = [...l]

      return temp.slice(1, l.length)
    })
  }

  return {
    list,
    getKey,
    resetList,
    insert,
    push,
    replace,
    unshift,
    remove,
    pop,
    shift
  }
}

export default useDynamicList