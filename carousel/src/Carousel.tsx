import CarouselSlide, {CarouselSlideProps} from './CarouselSlide'
import {ReactNode} from 'react'
import CarouselButton from './CarouselButton'
import {useSlideIndex} from "./useSlideIndex.tsx";

export type CarouselProps = {
  slides?: Slide[]
  DefaultImgComponent?: CarouselSlideProps['ImgComponent']
  defaultImgHeight?: CarouselSlideProps['imgHeight']
}

const Carousel = ({ slides, DefaultImgComponent, defaultImgHeight }: CarouselProps) => {
  const [slideIndex, decrementSlideIndex, incrementSlideIndex] = useSlideIndex(slides);

  return (
    <div data-testid="carousel" >
      <CarouselSlide
        ImgComponent={DefaultImgComponent}
        {...slides?.[slideIndex]}
        imgHeight={defaultImgHeight}
      />
      {(slides?.length || 0) > 1 && (
        <>
          <CarouselButton data-testid={'prev-button'} onClick={decrementSlideIndex} >Prev</CarouselButton>
          <CarouselButton data-testid={'next-button'} onClick={incrementSlideIndex} >Next</CarouselButton>
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
