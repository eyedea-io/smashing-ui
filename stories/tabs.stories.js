import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Tablist, Tab} from '@smashing/tabs'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Atomic Elements|Tabs', module)
  .addDecorator(story => (
    <SmashingThemeProvider theme={{}}>{story()}</SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <Tablist>
      <Tab isSelected>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </Tablist>
  ))
  .add('appearance:default invalid', () => (
    <Tablist invalid>
      <Tab invalid isSelected>
        Tab 1
      </Tab>
      <Tab invalid>Tab 2</Tab>
      <Tab invalid>Tab 3</Tab>
    </Tablist>
  ))
  .add('appearance:flat', () => (
    <Tablist appearance="flat">
      <Tab isSelected appearance="flat">
        Tab 1
      </Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </Tablist>
  ))

