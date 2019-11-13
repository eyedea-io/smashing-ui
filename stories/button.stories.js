import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Button} from '@smashing/button'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'
import {ArrowRightRegular, CalendarRegular} from './common/icon'

addDecorator(withA11y)

storiesOf('Atomic Elements|Button', module)
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
        <Button iconAfter={ArrowRightRegular} intent="info"></Button>
      </p>
      <p>
        <Button iconBefore={ArrowRightRegular} disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular}>Hulk smash!</Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={CalendarRegular} intent="danger">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular}>Hulk smash!</Button>
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
        <Button iconAfter={ArrowRightRegular} appearance="primary" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} appearance="primary">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="primary"
          intent="info"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="primary"
          intent="success"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="primary"
          intent="warning"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="primary"
          intent="danger"
        >
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
        <Button iconAfter={ArrowRightRegular} appearance="minimal" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} appearance="minimal">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="minimal"
          intent="info"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="minimal"
          intent="success"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="minimal"
          intent="warning"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="minimal"
          intent="danger"
        >
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
  .add('appearance:outline', () => (
    <React.Fragment>
      <p>
        <Button appearance="outline" disabled>
          Disabled
        </Button>
      </p>
      <p>
        <Button appearance="outline">Default</Button>
      </p>
      <p>
        <Button appearance="outline" intent="info">
          Info
        </Button>
      </p>
      <p>
        <Button appearance="outline" intent="success">
          Success
        </Button>
      </p>
      <p>
        <Button appearance="outline" intent="warning">
          Warning
        </Button>
      </p>
      <p>
        <Button appearance="outline" intent="danger">
          Danger
        </Button>
      </p>
      <p>
        <Button appearance="outline" intent="success" borderRadius={30}>
          Radius: 30
          </Button>
      </p>
    </React.Fragment>
  ))
  .add('appearance:flat-with-icon', () => (
    <React.Fragment>
      <p>
        <Button iconAfter={ArrowRightRegular} appearance="flat" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} appearance="flat">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} appearance="flat" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="flat"
          intent="success"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="flat"
          intent="warning"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} appearance="flat" intent="danger">
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
    <Button
      iconAfter={ArrowRightRegular}
      appearance="flat"
      intent="success"
      borderRadius={30}
    >
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
        <Button iconAfter={ArrowRightRegular} appearance="subtle" disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} appearance="subtle">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} appearance="subtle" intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="subtle"
          intent="success"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="subtle"
          intent="warning"
        >
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button
          iconAfter={ArrowRightRegular}
          appearance="subtle"
          intent="danger"
        >
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
        <Button iconAfter={ArrowRightRegular} height={24}>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} height={32}>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} height={40}>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button iconAfter={ArrowRightRegular} height={48}>
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
  .add('loading', () => (
    <React.Fragment>
      <p>
        <Button isLoading>Hello</Button>
      </p>
    </React.Fragment>
  ))
  .add('full', () => (
    <React.Fragment>
      <p>
        <Button full intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full iconBefore={ArrowRightRegular} intent="info"></Button>
      </p>
      <p>
        <Button full iconBefore={ArrowRightRegular} disabled>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full iconAfter={ArrowRightRegular}>
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full iconAfter={ArrowRightRegular} intent="info">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full iconAfter={ArrowRightRegular} intent="success">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full iconAfter={ArrowRightRegular} intent="warning">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full iconAfter={CalendarRegular} intent="danger">
          Hulk smash!
        </Button>
      </p>
      <p>
        <Button full iconAfter={ArrowRightRegular}>
          Hulk smash!
        </Button>
      </p>
    </React.Fragment>
  ))
