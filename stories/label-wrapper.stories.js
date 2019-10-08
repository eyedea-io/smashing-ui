import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {LabelWrapper} from '@smashing/label-wrapper'
import {Button} from '@smashing/button'
import {Alert} from '@smashing/alert'
import {PieChart} from '@smashing/charts'

import {Tablist, Tab} from '@smashing/tabs'
import {TextInput} from '@smashing/text-input'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

const pieChartData = [
  {name: 'USA', value: 60},
  {name: 'UK', value: 20},
  {name: 'Canada', value: 30},
  {name: 'Mexico', value: 15},
  {name: 'Japan', value: 10}
]

addDecorator(withA11y)

storiesOf('Core|LabelWrapper', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {},
        fontFamilies: {
          display: 'arial'
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <LabelWrapper labelTitle="Name" errorTitle="">
      <TextInput placeholder="Your name" />
    </LabelWrapper>
  ))
  .add('appearance:error', () => (
    <LabelWrapper labelTitle="Name" errorTitle="Error">
      <TextInput placeholder="This is an error" />
    </LabelWrapper>
  ))
  .add('appearance:on-alert', () => (
    <LabelWrapper labelTitle="Name" errorTitle="">
      <Alert title="Your account is active" />
    </LabelWrapper>
  ))
  .add('appearance:on-button', () => (
    <LabelWrapper labelTitle="Name" errorTitle="">
      <Button>Hulk smash!</Button>
    </LabelWrapper>
  ))
  .add('appearance:on-tabs', () => (
    <LabelWrapper labelTitle="Name" errorTitle="">
      <Tablist>
        <Tab isSelected>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tablist>
    </LabelWrapper>
  ))
  .add('appearance:error-on-tabs', () => (
    <LabelWrapper labelTitle="Name" errorTitle="Error">
      <Tablist>
        <Tab isSelected>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tablist>
    </LabelWrapper>
  ))
  .add('appearance:on-pie-chart', () => (
    <LabelWrapper labelTitle="Name" errorTitle="">
      <PieChart width={300} height={300} data={pieChartData} />
    </LabelWrapper>
  ))
  .add('appearance:error-on-pie-chart', () => (
    <LabelWrapper labelTitle="Name" errorTitle="Error">
      <PieChart width={300} height={300} data={pieChartData} />
    </LabelWrapper>
  ))
