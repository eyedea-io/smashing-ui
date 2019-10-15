import React, {useEffect} from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {FormField} from '@smashing/form-field'
import {useForm} from '@smashing/form'
import {TextInput} from '@smashing/text-input'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const BasicForm = ({children}) => {
  const {Form} = useForm({
    initialValues: {
      firstName: 'John'
    }
  })

  return (
    <div style={{padding: 16}}>
      <Form>{children}</Form>
    </div>
  )
}

const FormWithError = ({children}) => {
  const {Form, form} = useForm({
    initialValues: {
      firstName: 'John',
      email: ''
    }
  })

  useEffect(() => {
    form.setFieldError('email', 'Email is required')
  }, [])

  return (
    <div style={{padding: 16}}>
      <Form>{children}</Form>
    </div>
  )
}

storiesOf('Core|FormField', module)
  .addDecorator(story => (
    <SmashingThemeProvider
      theme={{
        colors: {
          background: {
            default: 'white'
          }
        }
      }}
    >
      {story()}
    </SmashingThemeProvider>
  ))
  .add('default', () => (
    <BasicForm>
      <FormField
        label="First name"
        placeholder="Type your name..."
        name="firstName"
        component={TextInput}
      />
    </BasicForm>
  ))
  .add('with description', () => (
    <BasicForm>
      <FormField
        label="First name"
        placeholder="Type your name..."
        name="firstName"
        description="Lorem ipsum dolor sit amt"
        component={TextInput}
      />
    </BasicForm>
  ))
  .add('with custom description', () => (
    <BasicForm>
      <FormField
        label="First name"
        placeholder="Type your name..."
        name="firstName"
        description={<div>Hello</div>}
        component={TextInput}
      />
    </BasicForm>
  ))
  .add('with hint', () => (
    <BasicForm>
      <FormField
        label="First name"
        placeholder="Type your name..."
        name="firstName"
        hint="I'm a hint. You need me."
        component={TextInput}
      />
    </BasicForm>
  ))
  .add('with custom hint', () => (
    <BasicForm>
      <FormField
        label="First name"
        placeholder="Type your name..."
        name="firstName"
        hint={<div>I'm a hint</div>}
        component={TextInput}
      />
    </BasicForm>
  ))
  .add('with error', () => (
    <FormWithError>
      <FormField
        label="Email"
        placeholder="Type your email..."
        name="email"
        hint="I'm a hint. You need me."
        component={TextInput}
      />
    </FormWithError>
  ))
  .add('labelAppearance: overlay', () => (
    <FormWithError>
      <FormField
        labelAppearance="overlay"
        label="Email"
        placeholder="Type your email..."
        name="email"
        hint="I'm a hint. You need me."
        description="Lorem ipsum dolor sit amt"
        component={TextInput}
      />
    </FormWithError>
  ))
  .add('alertAppearance: overlay', () => (
    <FormWithError>
      <FormField
        alertAppearance="overlay"
        label="Email"
        placeholder="Type your email..."
        name="email"
        hint="I'm a hint. You need me."
        description="Lorem ipsum dolor sit amt"
        component={TextInput}
      />
    </FormWithError>
  ))
  .add('label and alert appearance: overlay', () => (
    <FormWithError>
      <FormField
        alertAppearance="overlay"
        labelAppearance="overlay"
        label="Email"
        placeholder="Type your email..."
        name="email"
        hint="I'm a hint. You need me."
        description="Lorem ipsum dolor sit amt"
        component={TextInput}
      />
    </FormWithError>
  ))
  .add('labelVariant: 300', () => (
    <BasicForm>
      <FormField
        labelVariant={300}
        alertAppearance="overlay"
        labelAppearance="overlay"
        label="Email"
        placeholder="Type your email..."
        name="email"
        hint="I'm a hint. You need me."
        description="Lorem ipsum dolor sit amt"
        component={TextInput}
      />
    </BasicForm>
  ))
  .add('labelVariant: 400', () => (
    <BasicForm>
      <FormField
        labelVariant={400}
        alertAppearance="overlay"
        labelAppearance="overlay"
        label="Email"
        placeholder="Type your email..."
        name="email"
        hint="I'm a hint. You need me."
        description="Lorem ipsum dolor sit amt"
        component={TextInput}
      />
    </BasicForm>
  ))
  .add('labelVariant: 500', () => (
    <BasicForm>
      <FormField
        labelVariant={500}
        label="Email"
        placeholder="Type your email..."
        name="email"
        component={TextInput}
      />
    </BasicForm>
  ))
  .add('labelAppearance: inline', () => (
    <FormWithError>
      <section style={{'--label-column-width': '200px'}}>
        <FormField
          alertAppearance="overlay"
          labelAppearance="inline"
          label="Email or username"
          placeholder="Type your email..."
          name="email"
          hint="I'm a hint. You need me."
          description="Lorem ipsum dolor sit amt"
          component={TextInput}
        />
        <FormField
          alertAppearance="overlay"
          labelAppearance="inline"
          label="First name"
          placeholder="Type your fist name..."
          name="firstName"
          description="Lorem ipsum dolor sit amt"
          component={TextInput}
        />
      </section>
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #e5e5e5',
          margin: '16px 0'
        }}
      />
      <section style={{'--label-column-width': '150px'}}>
        <FormField
          alertAppearance="overlay"
          labelAppearance="inline"
          label="Email or username"
          placeholder="Type your email..."
          name="email"
          hint="I'm a hint. You need me."
          description="Lorem ipsum dolor sit amt"
          component={TextInput}
        />
        <FormField
          alertAppearance="overlay"
          labelAppearance="inline"
          label="First name"
          labelColumnWidth={300}
          placeholder="Type your fist name..."
          name="firstName"
          description="Lorem ipsum dolor sit amt"
          component={TextInput}
        />
      </section>
    </FormWithError>
  ))
  .add('uncontrolled', () => (
    <div style={{padding: 16}}>
      <FormField
        placeholder="Type your email..."
        component={TextInput}
        label="Email"
        name="email"
      />
    </div>
  ))
