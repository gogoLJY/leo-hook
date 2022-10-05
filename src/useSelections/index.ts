import { useState, useMemo } from 'react'

const useSelections = <T>(initialValue: T[], defaultSelected: T[]) => {
  const [selected, setSelected] = useState<T[]>(defaultSelected)

  const {
    selectSet,
    toggle,
    isSelected,
    unSelectFun,
    selectFun
  } = useMemo(() => {
    const selectSet = new Set(selected)

    const isSelected = (item: T) => selectSet.has(item)

    const unSelectFun = (item: T) => {
      selectSet.delete(item)

      return setSelected(Array.from(selectSet))
    }

    const selectFun = (item: T) => {
      selectSet.add(item)

      return setSelected(Array.from(selectSet))
    }

    const toggle = (item: T) => {
      if(isSelected(item)) {
        unSelectFun(item)
      } else {
        selectFun(item)
      }
    }

    return {
      selectSet,
      toggle,
      isSelected,
      unSelectFun,
      selectFun
    }
  }, [selected])

  const {
    isAllSelected,
    noneSelected,
    partiallySelected,
    unSelectAll,
    selectAll,
    toggleAll
  } = useMemo(() => {
    
    const isAllSelected = initialValue.every(item => selectSet.has(item))
    const noneSelected = initialValue.every(item => !selectSet.has(item))

    const partiallySelected = !isAllSelected && !noneSelected

    const unSelectAll = () => {
      initialValue.forEach(item => {
        selectSet.add(item)
      })

      return setSelected(Array.from(selectSet))
    }

    const selectAll = () => {
      initialValue.forEach(item => {
        selectSet.delete(item)
      })

      return setSelected([])
    }

    const toggleAll = () => {
      isAllSelected ? unSelectAll() : selectAll()
    }

    return {
      isAllSelected,
      noneSelected,
      partiallySelected,
      unSelectAll,
      selectAll,
      toggleAll
    }
  }, [initialValue, selectSet])

  return {
    selectSet,
    toggle,
    isSelected,
    unSelectFun,
    selectFun,
    isAllSelected,
    noneSelected,
    partiallySelected,
    unSelectAll,
    selectAll,
    toggleAll
  }
}

export default useSelections