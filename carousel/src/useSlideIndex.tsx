import {useState} from 'react'
import {useTimeout} from "./useTimeout.tsx";

const increment = (length: number) => (i: number) => (i + 1) % length
const decrement = (length: number) => (i: number) => (i + length - 1) % length

export const useSlideIndex = (
  slides?: unknown[],
  slideIndexProp?: number,
  onSlideIndexChange?: (newSlideIndex: number) => void,
  autoAdvanceInterval?: number
) => {
  const [slideIndexState, setSlideIndexState] = useState<number>(0)

  const slideIndex = slideIndexProp ?? slideIndexState

  const decrementSlideIndex = () => {
    if(!slides) return

    setSlideIndexState(decrement(slides.length))
    onSlideIndexChange?.(decrement(slides.length)(slideIndex))
  }

  const incrementSlideIndex = () => {
    if(!slides) return

    setSlideIndexState(increment(slides.length))
    onSlideIndexChange?.(increment(slides.length)(slideIndex))
  }

  useTimeout(autoAdvanceInterval, incrementSlideIndex)

  return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const
}
