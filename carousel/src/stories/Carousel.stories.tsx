import Carousel from "../Carousel";
import {Meta, StoryObj} from "@storybook/react";
import slides from "../examples/slides.tsx";
import { useArgs } from '@storybook/preview-api'

const meta = {
  title: 'Example/Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    slides
  },
  render: function RenderCarousel(args) {
    const [, updateArgs] = useArgs()
    return <Carousel
      {...args}
      onSlideIndexChange={(newSlideIndex) => {
        updateArgs({slideIndex: newSlideIndex})
        args.onSlideIndexChange?.(newSlideIndex)
        }
      }
    />
  }
}
