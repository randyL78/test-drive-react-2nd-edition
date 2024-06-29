import {useState} from 'react'

const increment = (length: number) => (i: number) => (i + 1) % length


const decrement = (length: number) => (i: number) => (i + length - 1) % length


export const useSlideIndex = (
  slides?: unknown[],
  slideIndexProp?: number,
  onSlideIndexChange?: (newSlideIndex: number) => void,
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

  return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const
}
