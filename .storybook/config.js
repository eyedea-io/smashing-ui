import {configure} from '@storybook/react'

configure(
  require.context('../stories', true, /\.stories\.(js|ts|tsx|mdx)$/),
  module
)
