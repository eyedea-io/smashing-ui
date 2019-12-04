import React from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {Alert} from '@smashing/alert'
import {Heading} from '@smashing/typography'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

storiesOf('Feedback Indicators|Alert', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        defaults: {
          alert: {
            hasTrim: true,
            hasIcon: true
          }
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('appearance:default', () => (
    <React.Fragment>
      <Alert title="Your account is active" />
    </React.Fragment>
  ))
  .add('appearance:default:description', () => (
    <React.Fragment>
      <Alert>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
        excepturi obcaecati. Numquam, fugit mollitia at aspernatur perferendis
        quo eligendi tenetur debitis.
      </Alert>
    </React.Fragment>
  ))
  .add('appearance:default:title:description', () => (
    <React.Fragment>
      <Alert title="Your account is active">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
        excepturi obcaecati. Numquam, fugit mollitia at aspernatur perferendis
        quo eligendi tenetur debitis.
      </Alert>
    </React.Fragment>
  ))
  .add('appearance:default:success', () => (
    <React.Fragment>
      <Alert title="Your account is active" intent="success">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
        excepturi obcaecati. Numquam, fugit mollitia at aspernatur perferendis
        quo eligendi tenetur debitis.
      </Alert>
    </React.Fragment>
  ))
  .add('appearance:default:danger', () => (
    <React.Fragment>
      <Alert title="Your account is active" intent="danger">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
        excepturi obcaecati. Numquam, fugit mollitia at aspernatur perferendis
        quo eligendi tenetur debitis.
      </Alert>
    </React.Fragment>
  ))
  .add('appearance:default:warning', () => (
    <React.Fragment>
      <Alert title="Your account is active" intent="warning">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
        excepturi obcaecati. Numquam, fugit mollitia at aspernatur perferendis
        quo eligendi tenetur debitis.
      </Alert>
    </React.Fragment>
  ))
  .add('appearance:inline', () => (
    <React.Fragment>
      <Alert title="Your account is active" appearance="inline" />
    </React.Fragment>
  ))
  .add('appearance:inline:success', () => (
    <React.Fragment>
      <Alert
        title="Your account is active"
        appearance="inline"
        intent="success"
      />
    </React.Fragment>
  ))
  .add('appearance:inline:danger', () => (
    <React.Fragment>
      <Alert
        title="Your account is active"
        appearance="inline"
        intent="danger"
      />
    </React.Fragment>
  ))
  .add('appearance:inline:warning', () => (
    <React.Fragment>
      <Alert
        title="Your account is active"
        appearance="inline"
        intent="warning"
      />
    </React.Fragment>
  ))
  .add('appearance:inline:description', () => (
    <React.Fragment>
      <Alert
        title="Your account is active"
        appearance="inline"
        intent="warning"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, sapiente
        dolorem corporis.
      </Alert>
    </React.Fragment>
  ))
  .add('appearance:card', () => (
    <React.Fragment>
      <Alert title="Your account is active" appearance="card">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, sapiente
        dolorem corporis.
      </Alert>
    </React.Fragment>
  ))
  .add('appearance:card:warning', () => (
    <React.Fragment>
      <Alert title="Your account is active" appearance="card" intent="warning">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, sapiente
        dolorem corporis.
      </Alert>
    </React.Fragment>
  ))
  .add('appearance:card:danger', () => (
    <React.Fragment>
      <Alert title="Your account is active" appearance="card" intent="danger">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, sapiente
        dolorem corporis.
      </Alert>
    </React.Fragment>
  ))
  .add('appearance:card:success', () => (
    <React.Fragment>
      <Alert title="Your account is active" appearance="card" intent="success">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, sapiente
        dolorem corporis.
      </Alert>
    </React.Fragment>
  ))
  .add('no trim', () => (
    <React.Fragment>
      <Alert title="Your account is active" hasTrim={false}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, sapiente
        dolorem corporis.
      </Alert>
    </React.Fragment>
  ))
  .add('no icon', () => (
    <React.Fragment>
      <Alert title="Your account is active" hasIcon={false}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, sapiente
        dolorem corporis.
      </Alert>
    </React.Fragment>
  ))
  .add('with close option', () => (
    <React.Fragment>
      <Alert
        title="Your account is active"
        onCloseClick={() => alert('Need close function')}
        hasClose
      />
      <br />
      <Alert
        title="Close by clicking on body"
        onCloseClick={() => alert('Need close function')}
        closeOnBodyClick
      />
    </React.Fragment>
  ))
  .add('all', () => (
    <div style={{display: 'grid', rowGap: '8px'}}>
      <Heading>Default style</Heading>
      <Alert title="Your account is active" />
      <Alert title="Your account is active" intent="danger" />
      <Alert title="Your account is active" intent="success" />
      <Alert title="Your account is active" intent="warning" />
      <Heading>Card style</Heading>
      <Alert title="Your account is active" appearance="card" />
      <Alert title="Your account is active" appearance="card" intent="danger" />
      <Alert
        title="Your account is active"
        appearance="card"
        intent="success"
      />
      <Alert
        title="Your account is active"
        appearance="card"
        intent="warning"
      />
      <Heading>Inline style</Heading>
      <Alert title="Your account is active" appearance="inline" />
      <Alert
        title="Your account is active"
        appearance="inline"
        intent="danger"
      />
      <Alert
        title="Your account is active"
        appearance="inline"
        intent="success"
      />
      <Alert
        title="Your account is active"
        appearance="inline"
        intent="warning"
      />
    </div>
  ))
