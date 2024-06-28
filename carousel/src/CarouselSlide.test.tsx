import {render, screen} from "@testing-library/react";
import CarouselSlide, {ScaledImg} from "./CarouselSlide";
import {expect} from "vitest";
import styled from "styled-components";

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

  it('has the expected static styles', () => {
    render(<CarouselSlide />)
    const img = screen.getByRole('img')

    expect(img).toHaveStyleRule('object-fit', 'cover')
    expect(img).toHaveStyleRule('width', '100%')
    expect(img).toHaveStyleRule('height', '500px')
  })

  it('uses `imgHeight` for the height of the <img>', () => {
    render(<CarouselSlide imgHeight='123px' />)
    const img = screen.getByRole('img')

    expect(img).toHaveStyleRule('height', '123px')
  })

  it('allows styles to be overridden with `ImgComponent`', () => {
    const TestImg = styled(ScaledImg)`
        width: auto;
        object-fit: fill;
    `as typeof ScaledImg

    render(<CarouselSlide ImgComponent={TestImg} imgHeight={250} />)
    const img = screen.getByRole('img')

    expect(img).toHaveStyleRule('width', 'auto')
    expect(img).toHaveStyleRule('height', '250px')
    expect(img).toHaveStyleRule('object-fit', 'fill')
  })
})
