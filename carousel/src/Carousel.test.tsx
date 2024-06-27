import {render, screen} from "@testing-library/react";
import Carousel from "./Carousel";
import {expect} from "vitest";

describe('Carousel', () => {
  const slides = [
    {
      imgUrl: 'https://example.com/image1.jpg',
      description: 'Slide 1',
      attribution: 'John Doe',
    },
    {
      imgUrl: 'https://example.com/image2.jpg',
      description: 'Slide 2',
      attribution: 'Jane Saunder',
    },
    {
      imgUrl: 'https://example.com/image3.jpg',
      description: 'Slide 3',
      attribution: 'King Louis VIII',
    },
  ]

  it('renders correctly', () => {
    render(<Carousel />)

    expect(screen.getByTestId('carousel')).toBeInTheDocument()
  })

  it('renders the first slide by default', () => {
    render(<Carousel slides={slides} />)
    const img = screen.getByRole('img')

    expect(img).toHaveAttribute('src', slides[0].imgUrl)
  })
});
