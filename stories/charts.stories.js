import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {ProgressBar} from '@smashing/charts'
import {BarChart} from '@smashing/charts'
import {SpiderChart} from '@smashing/charts'
import {PieChart} from '@smashing/charts'
import {RadialProgress} from '@smashing/charts'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const progressBarData = [
  {
    option: 'London',
    votes: 4
  },
  {
    option: 'New York',
    votes: 14,
    isResult: true
  },
  {
    option: 'Sydney',
    votes: 19
  },
  {
    option: 'Paris',
    votes: 35
  },
  {
    option: 'Beijing',
    votes: 87,
    isResult: true
  },
  {
    option: 'New York',
    votes: 67
  },
  {
    option: 'Sydney',
    votes: 76
  },
  {
    option: 'Sydney',
    votes: 76
  },
  {
    option: 'Paris',
    votes: 1,
    isResult: true
  }
]

const spiderChartData = {
  labels: ['Mass Appeal', 'Rebel', 'Friend', 'Young', 'Playful'],
  datasets: [
    {
      title: 'BS',
      values: [5, 5, 5, 5, 5]
    },
    {
      title: 'Votes',
      values: [2.5, 2.5, 2.5, 2.5, 2.5]
    }
  ]
}

const barChartData = [
  {value: 0.27, description: '5 votes'},
  {value: 0.63, description: '5 votes'},
  {value: 0.17, description: '5 votes'},
  {value: 0.55, description: '5 votes'},
  {value: 0.73, description: '5 votes'},
  {value: 0.13, description: '5 votes', isResult: true},
  {value: 0.68, description: '5 votes'},
  {value: 0.23, description: '5 votes'},
  {value: 0.36, description: '5 votes'},
  {value: 0.44, description: '5 votes'}
]

const pieChartData = [
  {name: 'USA', value: 60},
  {name: 'UK', value: 20},
  {name: 'Canada', value: 30},
  {name: 'Mexico', value: 15},
  {name: 'Japan', value: 10}
]

storiesOf('Charts|Progress Bar', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          progressBarChart: {
            colors: {
              topValues: 'pink',
              topIsResult: 'royalblue',
              restIsResult: 'navy'
            }
          }
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('default', () => (
    <React.Fragment>
      <ProgressBar
        width={600}
        data={progressBarData}
        colors={{
          topValues: 'orange',
          topIsResult: 'royalblue',
          restIsResult: 'navy'
        }}
      />
    </React.Fragment>
  ))

storiesOf('Charts|Spider Chart', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          spiderChart: {
            colors: ['pink', 'royalblue']
          }
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('default', () => (
    <React.Fragment>
      <SpiderChart width={500} data={spiderChartData} />
    </React.Fragment>
  ))

storiesOf('Charts|Bar Chart', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          barChart: {
            colors: ['red', 'pink', 'blue', 'steelblue']
          }
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('default', () => (
    <React.Fragment>
      <BarChart
        width={600}
        height={250}
        data={barChartData}
        titles={{left: 'Serious 45%', right: 'Playful 55%'}}
        colors={['orange', 'pink', 'green', 'red']}
      />
    </React.Fragment>
  ))

storiesOf('Charts|Radial Progress', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          radialProgressChart: {
            color: 'royalblue'
          }
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('default', () => (
    <React.Fragment>
      <RadialProgress
        width={200}
        height={200}
        data={40}
        description={'45 votes'}
      />
    </React.Fragment>
  ))

storiesOf('Charts|Pie Chart', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          pieChart: {
            colors: ['pink', 'royalblue']
          }
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('default', () => (
    <React.Fragment>
      <PieChart width={300} height={300} data={pieChartData} />
    </React.Fragment>
  ))
  .add('hidden labels, without spacing', () => (
    <React.Fragment>
      <PieChart
        hideLabels
        elementsSpacing={0}
        width={300}
        height={300}
        data={pieChartData}
      />
    </React.Fragment>
  ))
  .add('colors defined for specific element', () => (
    <React.Fragment>
      <PieChart
        hideLabels
        elementsSpacing={0}
        width={300}
        height={300}
        data={pieChartData.map((elem, i) => ({
          ...elem,
          color: i % 2 ? 'pink' : 'red'
        }))}
      />
    </React.Fragment>
  ))
