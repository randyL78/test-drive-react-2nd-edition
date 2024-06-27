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
      {(slides?.length || 0) > 1 && (
        <>
          <CarouselButton data-testid={'prev-button'} onClick={setPrevSlide} >Prev</CarouselButton>
          <CarouselButton data-testid={'next-button'} onClick={setNextSlide} >Next</CarouselButton>
        </>
      )}
    </div>
  )
}

export default Carousel

type Slide = {
  imgUrl?: string,
  description?: ReactNode,
  attribution?: ReactNode,
}
