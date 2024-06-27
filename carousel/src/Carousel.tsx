import CarouselSlide from './CarouselSlide'
import {ReactNode, useState} from 'react'
import CarouselButton from './CarouselButton'

const Carousel = ({ slides }: {slides?: Slide[]}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const setNextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length)
  }

  const setPrevSlide = () => {
    setActiveSlide((current) => (current + slides.length - 1) % slides.length)
  }


  return (
    <div data-testid="carousel" >
      <CarouselSlide {...slides?.[activeSlide]} />
      <CarouselButton data-testid={'next-button'} onClick={setNextSlide} value='Next' />
      <CarouselButton data-testid={'prev-button'} onClick={setPrevSlide} value='Prev' />
    </div>
  )
}

export default Carousel

type Slide = {
  imgUrl?: string,
  description?: ReactNode,
  attribution?: ReactNode,
}
