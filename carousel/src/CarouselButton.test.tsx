import {render, screen} from '@testing-library/react';
import CarouselButton from './CarouselButton';
import {expect} from "vitest";

describe('CarouselButton', () => {
  it('renders a button', () => {
    render(<CarouselButton />)
    expect(screen.getByRole('button')).toBeInTheDocument();
  })
});
