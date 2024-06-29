import CarouselSlide, {CarouselSlideProps} from './CarouselSlide'
import {ReactNode} from 'react'
import CarouselButton from './CarouselButton'
import {useSlideIndex} from "./useSlideIndex.tsx";

export type CarouselProps = {
  autoAdvanceInterval?: number
  slides?: Slide[]
  slideIndex?: number
  onSlideIndexChange?: (index: number) => void
  DefaultImgComponent?: CarouselSlideProps['ImgComponent']
  defaultImgHeight?: CarouselSlideProps['imgHeight']
}

const Carousel = ({ autoAdvanceInterval, slides, slideIndex: slideIndexProp, DefaultImgComponent, onSlideIndexChange, defaultImgHeight }: CarouselProps) => {
  const [defaultSlideIndex, decrementSlideIndex, incrementSlideIndex] = useSlideIndex(slides, slideIndexProp, onSlideIndexChange, autoAdvanceInterval);

  return (
    <div data-testid="carousel" >
      <CarouselSlide
        ImgComponent={DefaultImgComponent}
        {...slides?.[defaultSlideIndex]}
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
