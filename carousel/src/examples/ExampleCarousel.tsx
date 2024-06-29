import Carousel from "../Carousel";
import slides from "./slides";

export default function ExampleCarousel() {
  return <Carousel autoAdvanceInterval={2000} slides={slides} defaultImgHeight={"30rem"}/>
}
