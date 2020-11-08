import { IDropProps, IDropOptions, IDropState } from './type'
import React, { useRef, useState, useMemo, useCallback } from 'react'

const getProps = (callback: (dataTransfer: DataTransfer, e: React.DargEvent | React.ClipboardEvent) => void, setIsHovering: (over: boolean) => void): IDropProps => {
  return {
    onDropOver: (e: React.DragEvent) => {
      e.preventDefault();
    },
    onDropEnter: (e: React.DargEvent) => {
      e.preventDefault();
      setIsHovering(true)
    },
    onDropLeave: (e: React.DargEvent) => {
      setIsHovering(false)
    },
    onDrop: (e: React.DargEvent) => {
      e.preventDefault();
      e.persist()
      setIsHovering(false)
      callback(e.dataTransfer, e)
    },
    onParse: (e: React.ClipboardEventHandler) => {
      e.persist()
      callback(e.clipboardData, e)
    }
  }
}

const useDrop = (options: IDropOptions): [IDropProps, IDropState] => {
  const optionRef = useRef<any>(options);
  optionRef.current = options

  const [isHovering, setIsHovering] = useState<boolean>(false)

  const callback = useCallback((dataTransfer: DataTransfer, event: React.DargEvent | React.ClipboardEvent) => {
    const dom = dataTransfer.getData('custom')
    const uri = dataTransfer.getData('text/uri-list')

    if (dom && optionRef.current.onDom) {
      let data = dom

      try {
        data = JSON.parse(dom)
      } catch (error) {
        data = dom
      }

      optionRef.current.onDom(data, event as React.DargEvent)

      return
    }

    if (uri && optionRef.current.onUri) {
      optionRef.current.onUri(uri, event as React.DargEvent)
      return
    }

    if (dataTransfer.files && dataTransfer.files.length && optionRef.current.onFiles) {
      optionRef.current.onFiles(Array.from(dataTransfer.files), event as React.DragEvent)

      return
    }

    if (dataTransfer.items && dataTransfer.items.length && optionRef.current.onText) {
      dataTransfer.items[0].getAsString((text) => {
        optionRef.current.onText(text, event)
      })
    }
  }, [])

  const props = useMemo(() => getProps(callback, setIsHovering), [callback, setIsHovering])

  return [props, isHovering]
}

export default useDrop