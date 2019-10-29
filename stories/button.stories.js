import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Button} from '@smashing/button'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {ArrowRightRegular, CalendarRegular} from './common/icon'

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
        <Button icon={CalendarRegular} intent="danger">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular}>Hulk smash!</Button>
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
  .add('appearance:primary-with-icon', () => (
    <React.Fragment>
      <p>
        <Button icon={ArrowRightRegular} appearance="primary" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="primary">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="primary" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="primary" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="primary" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="primary" intent="danger">
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
  .add('appearance:minimal-with-icon', () => (
    <React.Fragment>
      <p>
        <Button icon={ArrowRightRegular} appearance="minimal" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="minimal">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="minimal" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="minimal" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="minimal" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="minimal" intent="danger">
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
  .add('appearance:flat-with-icon', () => (
    <React.Fragment>
      <p>
        <Button icon={ArrowRightRegular} appearance="flat" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="flat">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="flat" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="flat" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="flat" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="flat" intent="danger">
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
  .add('borderRadius:30-with-icon', () => (
    <Button icon={ArrowRightRegular} appearance="flat" intent="success" borderRadius={30}>
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
  .add('appearance:subtle-with-icon', () => (
    <React.Fragment>
      <p>
        <Button icon={ArrowRightRegular} appearance="subtle" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="subtle">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="subtle" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="subtle" intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="subtle" intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} appearance="subtle" intent="danger">
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
  .add('height-with-icon', () => (
    <React.Fragment>
      <p>
        <Button icon={ArrowRightRegular} height={24}>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} height={32}>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} height={40}>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button icon={ArrowRightRegular} height={48}>
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add('loading', () => <Button isLoading>Hulk smash!</Button>)
  .add('full', () => (
    <Button isLoading full>
      Hulk smash!
    </Button>
  ))
  .add('full-with-icon', () => (
    <React.Fragment>
      <p>
        <Button
          full
          icon={ArrowRightRegular}
          iconPosition="center"
          intent="info"
        ></Button>
      </p>
      <p>
        <Button full icon={ArrowRightRegular} iconPosition="left" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full icon={ArrowRightRegular}>Hulk smash!</Button>
      </p>
      <p>
        <Button full icon={ArrowRightRegular} intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full icon={ArrowRightRegular} intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full icon={ArrowRightRegular} intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full icon={CalendarRegular} intent="danger">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full icon={ArrowRightRegular}>Hulk smash!</Button>
      </p>
    </React.Fragment>
  ))
