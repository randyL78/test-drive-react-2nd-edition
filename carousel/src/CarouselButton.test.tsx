import {render, screen} from '@testing-library/react';
import CarouselButton from './CarouselButton';
import {expect} from "vitest";

describe('CarouselButton', () => {
  it('renders a button', () => {
    render(<CarouselButton />)
    expect(screen.getByRole('button')).toBeInTheDocument();
  })

  it('passes `children` through the <button>', () => {
    const text = "Button Text"

    render(<CarouselButton>{text}</CarouselButton>)

    expect(screen.getByRole('button')).toHaveTextContent('Button Text')
  });

  it('passes other props through the <button>', () => {
    const className = 'my-custom-class'
    const dataAction = 'prev'
    render(
      <CarouselButton className={className} data-action={dataAction}>
        Button Text
      </CarouselButton>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass(className)
    expect(button).toHaveAttribute('data-action', dataAction)
  })
});
