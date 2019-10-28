import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Button} from '@smashing/button'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Core|Button', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          button: {}
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <React.Fragment>
      <p>
        <Button disabled>Hulk smash!</Button>
      </p>
      <p>
        <Button>Hulk smash!</Button>
      </p>
      <p>
        <Button intent="info">Hulk smash!</Button>
      </p>
      <p>
        <Button intent="success">Hulk smash!</Button>
      </p>
      <p>
        <Button intent="warning">Hulk smash!</Button>
      </p>
      <p>
        <Button intent="danger">Hulk smash!</Button>
      </p>
    </React.Fragment>
  ))
  .add('appearance:default-with-icon', () => (
    <React.Fragment>
      <p>
        <Button
          icon={ArrowRightRegular}
          iconPosition="center"
          intent="info"
        ></Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} iconPosition="left" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular}>Hulk smash!</Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} intent="danger">
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add('appearance:primary', () => (
    <React.Fragment>
      <p>
        <Button appearance="primary" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="primary">Hulk smash!</Button>
      </p>
      <p>
        <Button appearance="primary" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="primary" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="primary" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="primary" intent="danger">
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add('appearance:minimal', () => (
    <React.Fragment>
      <p>
        <Button appearance="minimal" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="minimal">Hulk smash!</Button>
      </p>
      <p>
        <Button appearance="minimal" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="minimal" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="minimal" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="minimal" intent="danger">
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add('appearance:flat', () => (
    <React.Fragment>
      <p>
        <Button appearance="flat" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="flat">Hulk smash!</Button>
      </p>
      <p>
        <Button appearance="flat" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="flat" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="flat" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="flat" intent="danger">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="flat" intent="success" borderRadius={30}>
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add('borderRadius:30', () => (
    <Button appearance="flat" intent="success" borderRadius={30}>
      Hulk smash!
    </Button>
  ))
  .add('appearance:subtle', () => (
    <React.Fragment>
      <p>
        <Button appearance="subtle" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="subtle">Hulk smash!</Button>
      </p>
      <p>
        <Button appearance="subtle" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="subtle" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="subtle" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button appearance="subtle" intent="danger">
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add('height', () => (
    <React.Fragment>
      <p>
        <Button height={24}>Hulk smash!</Button>
      </p>
      <p>
        <Button height={32}>Hulk smash!</Button>
      </p>
      <p>
        <Button height={40}>Hulk smash!</Button>
      </p>
      <p>
        <Button height={48}>Hulk smash!</Button>
      </p>
    </React.Fragment>
  ))
  .add('loading', () => <Button isLoading>Hulk smash!</Button>)
  .add('full', () => (
    <Button isLoading full>
      Hulk smash!
    </Button>
  ))

export var ArrowRightRegular = function(_a) {
  var _b = _a.color,
    color = _b === void 0 ? 'black' : _b,
    _c = _a.size,
    size = _c === void 0 ? 32 : _c
  return React.createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 16 16',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    React.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d:
        'M3 8C3 7.44772 3.44772 7 4 7H12C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9H4C3.44772 9 3 8.55228 3 8Z',
      fill: color
    }),
    React.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d:
        'M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711C12.3166 9.09763 11.6834 9.09763 11.2929 8.70711L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z',
      fill: color
    }),
    React.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d:
        'M8.29289 11.7071C7.90237 11.3166 7.90237 10.6834 8.29289 10.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L9.70711 11.7071C9.31658 12.0976 8.68342 12.0976 8.29289 11.7071Z',
      fill: color
    })
  )
}
