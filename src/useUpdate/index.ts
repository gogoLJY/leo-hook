import { useState, useCallback } from  'react'

function useUpdate() {
  const [, setstate] = useState<number>(0)

  return useCallback(() => {
    setstate((num: number) => {
      return num + 1
    })
  }, [])
}

export default useUpdate