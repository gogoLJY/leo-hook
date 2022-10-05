import { useRef, useState, useEffect, useCallback } from 'react'
import useUnmount from '../useUnmount'

export interface IOptions {
  reconnectLimit?: number
  reconnectInterval?: number
  onOpen?: (event: WebSocketEventMap['open']) => void
  onClose?: (event: WebSocketEventMap['close']) => void
  onMessage?: (event: WebSocketEventMap['message']) => void
  onError?: (event: WebSocketEventMap['error']) => void
}

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3
}

const useWebSocket = (socketUrl: string, options: IOptions = {}) => {
  const {
    reconnectLimit,
    reconnectInterval,
    onOpen,
    onClose,
    onMessage,
    onError,
  } = options

  const reconnectTimesRef = useRef(0);
  const reconnectTimerRef = useRef<number>()
  const websocketRef = useRef<WebSocket>()

  const [latestMessage, setLatestMessage] = useState<WebSocketEventMap['message']>()
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed)

  const connect = useCallback(() => {
    reconnectTimesRef.current = 0
    connectWS()
  }, [])

  const disconnect = useCallback(() => {
    reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current)

    reconnectTimesRef.current = reconnectLimit
    websocketRef.current?.close()
  }, [])

  const reconnect = useCallback(() => {
    if (
      reconnectTimesRef.current < reconnectLimit &&
      websocketRef.current?.readyState !== ReadyState.Open
    ) {
      reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current)

      reconnectTimerRef.current = setTimeout(() => {
        connectWS()
        reconnectTimesRef.current++
      }, reconnectInterval);
    }
  }, [])

  const sendMessage = useCallback((message: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    if (readyState === ReadyState.Open) {
      websocketRef.current?.send(message)
    } else {
      throw new Error('WebSocket disconnected')
    }
  }, [])

  const connectWS = () => {
    reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current)

    if (websocketRef.current) {
      websocketRef.current.close()
    }

    try {
      websocketRef.current = new WebSocket(socketUrl)
      websocketRef.current.onopen = (event: Event) => {
        onOpen?.(event)
        setReadyState(websocketRef.current?.readyState || ReadyState.Open)
      }

      websocketRef.current.onmessage = (event: MessageEvent) => {
        onMessage?.(event)
        setLatestMessage(event)
      }

      websocketRef.current.onclose = (event: CloseEvent) => {
        reconnect()
        onClose?.(event)
        setReadyState(websocketRef.current?.readyState || ReadyState.Closed)
      }

      websocketRef.current.onerror = (event: Event) => {
        reconnect()
        onError?.(event)
        setReadyState(websocketRef.current?.readyState || ReadyState.Closed)
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    connect()
  }, [socketUrl])

  useUnmount(() => {
    disconnect()
  })

  return {
    readyState,
    latestMessage,
    sendMessage,
    connect,
    disconnect,
    websocketIns: websocketRef.current
  }
}

export default useWebSocket