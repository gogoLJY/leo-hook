import React from 'react'

export interface IDragConfig {
  onDragStart: (data: any, e: Event) => void,
  onDragEnd: (data: any, e: Event) => void
}

export type IDragFn = (data: any) => {
  draggable: string
  key?: string
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: (e: React.DragEvent) => void
}

export interface IDropOptions {
  onFiles: (files: File[], event: React.DragEvent) => void
  onUri: (url: string, event: React.DragEvent) => void
  onDom: (content: any, event: React.DragEvent) => void
  onText: (text: string, event: React.DragEvent) => void
}

export interface IDropProps {
  onDropOver: React.DragEventHandler
  onDropEnter: React.DragEventHandler
  onDropLeave: React.DragEventHandler
  onDrop: React.DragEventHandler
  onParse: React.ClipboardEventHandler
}

export interface IDropState {
  isHovering: boolean
}