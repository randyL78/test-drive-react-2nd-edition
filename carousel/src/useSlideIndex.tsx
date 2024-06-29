import {useCallback, useRef, useState} from 'react'
import {useTimeout} from "./useTimeout";

const increment = (length: number) => (i: number) => (i + 1) % length
const decrement = (length: number) => (i: number) => (i + length - 1) % length

export const useSlideIndex = (
  slides?: unknown[],
  slideIndexProp?: number,
  onSlideIndexChange?: (newSlideIndex: number) => void,
  autoAdvanceInterval?: number
) => {
  const [slideIndexState, setSlideIndexState] = useState<number>(0)
  const onSlideIndexChangeRef = useRef(onSlideIndexChange)
  onSlideIndexChangeRef.current = onSlideIndexChange

  const slideIndex = slideIndexProp ?? slideIndexState

  const decrementSlideIndex = () => {
    if(!slides) return

    setSlideIndexState(decrement(slides.length))
    onSlideIndexChange?.(decrement(slides.length)(slideIndex))
  }

  const incrementSlideIndex = useCallback(() => {
    if(!slides?.length) return

    setSlideIndexState(increment(slides.length))
    onSlideIndexChangeRef.current?.(increment(slides.length)(slideIndex))
  }, [slides?.length, slideIndex])

  useTimeout(autoAdvanceInterval, incrementSlideIndex)

  return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const
}
