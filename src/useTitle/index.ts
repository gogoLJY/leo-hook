import { useEffect, useRef } from 'react'

interface IOptions {
  resetTitle: boolean
}

function useTitle(title: string, options?: IOptions) {
  const titleRef = useRef(document.title);

  useEffect(() => {
    document.title = title
  }, [])

  useEffect(() => () => {
    if (options?.resetTitle) {
      document.title = titleRef.current
    }
  }, [])
}

export default useTitle