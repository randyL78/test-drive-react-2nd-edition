import {useState} from 'react'

export const useSlideIndex = (slides?: unknown[]) => {
  const [slideIndex, setSlideIndex] = useState<number>(0)

  const decrementSlideIndex = () => {
    if(!slides) return

    setSlideIndex((current) => (current + slides.length - 1) % slides.length)
  }

  const incrementSlideIndex = () => {
    if(!slides) return

    setSlideIndex((current) => (current + 1) % slides.length)
  }

  return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const
}
