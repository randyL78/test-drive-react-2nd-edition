import CarouselSlide, {CarouselSlideProps} from './CarouselSlide'
import {ReactNode, useState} from 'react'
import CarouselButton from './CarouselButton'

export type CarouselProps = {
  slides?: Slide[]
  DefaultImgComponent?: CarouselSlideProps['ImgComponent']
  defaultImgHeight?: CarouselSlideProps['imgHeight']
}

const Carousel = ({ slides, DefaultImgComponent, defaultImgHeight }: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const setNextSlide = () => {
    if (!slides) return

    setActiveSlide((current) => (current + 1) % slides.length)
  }

  const setPrevSlide = () => {
    if (!slides) return

    setActiveSlide((current) => (current + slides.length - 1) % slides.length)
  }

  return (
    <div data-testid="carousel" >
      <CarouselSlide
        ImgComponent={DefaultImgComponent}
        {...slides?.[activeSlide]}
        imgHeight={defaultImgHeight}
      />
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
