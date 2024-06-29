import Carousel from "../Carousel";
import {Meta, StoryObj} from "@storybook/react";
import slides from "../examples/slides.tsx";

const meta = {
  title: 'Example/Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    slides
  }
}
