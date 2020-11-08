import React from 'react';
import { IDragConfig, IDragFn } from './type';

const useDrag = (config: IDragConfig): IDragFn => {
  const getProp = (data: any) => {
    return {
      key: '',
      draggable: 'true',
      onDragStart: (e: React.DragEvent) => {
        if (config && config.onDragStart) {
          config.onDragStart(data, e)
        }
      },
      onDragEnd: (e: React.DragEvent) => {
        if (config && config.onDragEnd) {
          config.onDragEnd(data, e)
        }
      }
    }
  }

  return getProp
}

export default useDrag