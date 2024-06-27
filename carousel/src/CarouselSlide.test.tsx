import {render, screen} from "@testing-library/react";
import CarouselSlide from "./CarouselSlide";
import {expect} from "vitest";

describe('CarouselSlide()', () => {
  it('renders a <figure>', () => {
    render(<CarouselSlide />);
    expect(screen.getByRole('figure')).toBeInTheDocument()
  })

  it('renders an <img> and a <figcaption>', () => {
    render(<CarouselSlide />)
    const figure = screen.getByRole('figure')
    const img = screen.getByRole('img')
    const figCaption = screen.getByTestId('caption')

    expect(figure).toContainElement(img)
    expect(figure).toContainElement(figCaption)
  })

  it('passes `imgUrl` through the <img>', () => {
    const imgUrl = 'https://example.com/img.png'

    render(<CarouselSlide imgUrl={imgUrl} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', imgUrl)
  })

  it('uses `description` and `attribution` as the caption', () => {
    const props = {
      description: 'This is a description',
      attribution: 'John Doe',
    }

    render(<CarouselSlide {...props} />)

    const figCaption = screen.getByTestId('caption')
    expect(figCaption).toHaveTextContent(
      `${props.description} ${props.attribution}`
    )
  })

  it('passes props through the <figure>', () => {
    const props = {
      className: 'my-custom-class',
      'data-test-name': 'My Slide',
    }

    render(<CarouselSlide {...props} />)
    const figure = screen.getByRole('figure')

    expect(figure).toHaveClass(props.className)
    expect(figure).toHaveAttribute('data-test-name', 'My Slide')
  })
})
