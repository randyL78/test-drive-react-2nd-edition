import CarouselSlide from "./CarouselSlide.tsx";
import {ReactNode} from "react";

const Carousel = ({ slides }: {slides?: Slide[]}) => {
  return (
    <div data-testid="carousel" >
      <CarouselSlide {...slides?.[0]} />
    </div>
  )
}

export default Carousel

type Slide = {
  imgUrl?: string,
  description?: ReactNode,
  attribution?: ReactNode,
}
