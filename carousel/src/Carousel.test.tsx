import {render, screen} from "@testing-library/react";
import Carousel from "./Carousel";
import {expect} from "vitest";
import userEvent from "@testing-library/user-event";

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

  it('advances the slide when the Next button is clicked', async () => {
    render(<Carousel slides={slides} />)
    const img = screen.getByRole('img')
    const nextButton = screen.getByTestId('next-button')
    const user = userEvent.setup()

    await user.click(nextButton)
    expect(img).toHaveAttribute('src', slides[1].imgUrl)
    await user.click(nextButton)
    expect(img).toHaveAttribute('src', slides[2].imgUrl)
    await user.click(nextButton)
    expect(img).toHaveAttribute('src', slides[0].imgUrl)
  })

  it('contains a previous button', () => {
    render(<Carousel slides={slides}/>)
    const prevButton = screen.getByTestId('prev-button')

    expect(prevButton).toBeInTheDocument()
  })

  it('advances the slide when the Next button is clicked', async () => {
    render(<Carousel slides={slides} />)
    const img = screen.getByRole('img')
    const nextButton = screen.getByTestId('prev-button')
    const user = userEvent.setup()

    await user.click(nextButton)
    expect(img).toHaveAttribute('src', slides[2].imgUrl)
    await user.click(nextButton)
    expect(img).toHaveAttribute('src', slides[1].imgUrl)
    await user.click(nextButton)
    expect(img).toHaveAttribute('src', slides[0].imgUrl)
  })
});
