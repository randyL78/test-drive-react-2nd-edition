import {act, render, screen} from "@testing-library/react";
import Carousel from "./Carousel";
import {beforeEach, expect} from "vitest";
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

  it('contains a next button', () => {
    render(<Carousel slides={slides}/>)
    const nextButton = screen.getByTestId('next-button')

    expect(nextButton).toBeInTheDocument()
  })

  it('does not contain a next button when there are less than 2 slides', () => {
    render(<Carousel slides={[slides[0]]}/>)
    const nextButton = screen.queryByTestId('next-button')

    expect(nextButton).not.toBeInTheDocument()
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

  it('does not contain a previous button when there are less than 2 slides', () => {
    render(<Carousel slides={[slides[0]]}/>)
    const prevButton = screen.queryByTestId('prev-button')

    expect(prevButton).not.toBeInTheDocument()
  })

  it('advances the slide when the Prev button is clicked', async () => {
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

  it('passes DefaultImgComponent to the CarouselSlide', () => {
    const DefaultImgComponent = () => <img data-testid="test-img" />

    render(<Carousel slides={slides} DefaultImgComponent={DefaultImgComponent}/>)
    const img = screen.getByRole('img')

    expect(img).toHaveAttribute('data-testid', 'test-img')
  })

  it('passes defaultImgHeight to the CarouselSlide', () => {
    const defaultImgHeight = 1234

    render(<Carousel slides={slides} defaultImgHeight={defaultImgHeight} />)
    const img = screen.getByRole('img')

    expect(img).toHaveStyleRule('height', '1234px')
  })

  describe('with controlled slideIndex', () => {
    const onSlideIndexChange = vi.fn()
    const renderCarouselWithSlideIndex = () => {
      render(
        <Carousel
            slides={slides}
            slideIndex={1}
            onSlideIndexChange={onSlideIndexChange}
          />
      )
    }
    beforeEach(() => {
      onSlideIndexChange.mockReset
    })

    it('shows the slide corresponding to slideIndex', () => {
      renderCarouselWithSlideIndex()
      const img = screen.getByRole('img')

      expect(img).toHaveAttribute('src', slides[1].imgUrl)
    });

    it('calls onSlideIndexChange when `Next` is clicked', async () => {
      renderCarouselWithSlideIndex()
      const img = screen.getByRole('img')
      const nextButton = screen.queryByTestId('next-button')
      const user = userEvent.setup()

      await user.click(nextButton)

      expect(img).toHaveAttribute('src', slides[1].imgUrl)
      expect(onSlideIndexChange).toHaveBeenCalledWith(2)
    })

    it('calls onSlideIndexChange when `Prev` is clicked', async () => {
      renderCarouselWithSlideIndex()
      const img = screen.getByRole('img')
      const prevButton = screen.queryByTestId('prev-button')
      const user = userEvent.setup()

      await user.click(prevButton)

      expect(img).toHaveAttribute('src', slides[1].imgUrl)
      expect(onSlideIndexChange).toHaveBeenCalledWith(2)
    })
  });

  describe('with auto advance', () => {
    it('advances the slide according to autoAdvanceInterval', () => {
      const autoAdvanceInterval = 5000
      render(
        <Carousel slides={slides} autoAdvanceInterval={autoAdvanceInterval} />
      )
      const img = screen.getByRole('img')

      act(() => {
        vi.advanceTimersByTime(autoAdvanceInterval)
      })

      expect(img).toHaveAttribute('src', slides[1].imgUrl)
    })

    it('does not reset the auto advance timer on re-render', () => {
      const autoAdvanceInterval = 5000
      const { rerender } = render(
        <Carousel slides={slides} autoAdvanceInterval={autoAdvanceInterval} />
      )

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', slides[0].imgUrl)

      act(() => {
        vi.advanceTimersByTime(autoAdvanceInterval - 1)
      })

      expect(img).toHaveAttribute('src', slides[0].imgUrl)

      rerender(
        <Carousel slides={slides} autoAdvanceInterval={autoAdvanceInterval} />
      )

      act(() => {
        vi.advanceTimersByTime(1)
      })

      expect(img).toHaveAttribute('src', slides[1].imgUrl)
    })

    it('does not reset the timer on irrelevant prop changes', () => {
      const autoAdvanceInterval = 5000
      const CarouselParent = () => (
        <Carousel
          slides={slides}
          onSlideIndexChange={vi.fn()}
          autoAdvanceInterval={autoAdvanceInterval}
        />
      )
      const { rerender } = render(<CarouselParent />)
      const img = screen.getByRole('img')

      expect(img).toHaveAttribute('src', slides[0].imgUrl)

      act(() => {
        vi.advanceTimersByTime(autoAdvanceInterval - 1)
      })

      expect(img).toHaveAttribute('src', slides[0].imgUrl)

      rerender(<CarouselParent />)

      act(() => {
        vi.advanceTimersByTime(1)
      })

      expect(img).toHaveAttribute('src', slides[1].imgUrl)
    })
  });
});
