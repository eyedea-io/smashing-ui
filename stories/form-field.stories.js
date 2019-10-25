import React, {useEffect} from 'react'
import {storiesOf, addDecorator} from '@storybook/react'
import {FormField} from '@smashing/form-field'
import {useForm} from '@smashing/form'
import {TextInput} from '@smashing/text-input'
import {Select} from '@smashing/select'
import {Textarea} from '@smashing/textarea'
import {Checkbox} from '@smashing/checkbox'
import {RadioButton} from '@smashing/radio-button'
import {Tabs} from '@smashing/tabs'
import {withA11y} from '@storybook/addon-a11y'
import {SmashingThemeProvider} from '@smashing/theme'

addDecorator(withA11y)

const optionsWithLabels = [
  {value: 'abc', label: 'ABC Option'},
  {value: 'bca', label: 'BCA Option'},
  {value: 'cde', label: 'Longer Option'},
  {value: 'def', label: 'DEF Option'}
]

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
  .add('appearance:outline input / no placeholder', () => (
    <div style={{display: 'grid', gridAutoRows: '50px'}}>
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        label="Email"
        name="email"
        component={TextInput}
      />
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        label="Email"
        name="email"
        disabled
        component={TextInput}
      />
    </div>
  ))
  .add('appearance:outline input / placeholder', () => (
    <div style={{display: 'grid', gridAutoRows: '50px'}}>
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        label="Email"
        name="email"
        placeholder="Type your email"
        component={TextInput}
      />
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        label="Email"
        name="email"
        placeholder="Type your email"
        disabled
        component={TextInput}
      />
    </div>
  ))

  .add('appearance:outline input / placeholder / no label', () => (
    <div style={{display: 'grid', gridAutoRows: '50px'}}>
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        name="email"
        placeholder="Type your email"
        component={TextInput}
      />
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        name="email"
        placeholder="Type your email"
        disabled
        component={TextInput}
      />
    </div>
  ))
  .add('appearance:outline input / with suffix', () => (
    <div style={{display: 'grid', gridAutoRows: '50px'}}>
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        name="distance"
        label="distance"
        suffix="km"
        component={TextInput}
      />
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        name="distance"
        label="distance"
        suffix="km"
        disabled
        component={TextInput}
      />
    </div>
  ))
  .add('appearance:outline select', () => (
    <div style={{display: 'grid', gridAutoRows: '50px'}}>
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        options={optionsWithLabels}
        name="select"
        label="Label"
        component={Select}
      />
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        name="select"
        label="Label"
        disabled
        component={Select}
      />
    </div>
  ))
  .add('appearance:outline textarea', () => (
    <div style={{display: 'grid', gridAutoRows: '50px', gridRowGap: '10px'}}>
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        name="name"
        label="Label"
        component={Textarea}
      />
      <FormField
        appearance="outline"
        labelAppearance="overlay"
        alertAppearance="overlay"
        name="name"
        label="Label"
        disabled
        description="Lorem ipsum dolor sit amt"
        component={Textarea}
      />
    </div>
  ))
  .add('appearance:outline checkbox', () => (
    <div style={{display: 'grid', gridAutoRows: '50px'}}>
      <FormField
        appearance="outline"
        alertAppearance="overlay"
        name="checkbox"
        component={Checkbox}
      >
        Content
      </FormField>
      <FormField
        appearance="outline"
        alertAppearance="overlay"
        name="checkbox"
        checked
        component={Checkbox}
      >
        Content
      </FormField>
      <FormField
        appearance="outline"
        alertAppearance="overlay"
        name="checkbox"
        disabled
        component={Checkbox}
      >
        Content
      </FormField>
      <FormField
        appearance="outline"
        alertAppearance="overlay"
        name="checkbox"
        disabled
        checked
        component={Checkbox}
      >
        Content
      </FormField>
    </div>
  ))
  .add('appearance:outline switcher', () => (
    <div style={{display: 'grid', gridAutoRows: '50px'}}>
      <FormField
        appearance="switcher"
        alertAppearance="overlay"
        name="checkbox"
        component={Checkbox}
      >
        Content
      </FormField>
      <FormField
        appearance="switcher"
        alertAppearance="overlay"
        name="checkbox"
        checked
        component={Checkbox}
      >
        Content
      </FormField>
      <FormField
        appearance="switcher"
        alertAppearance="overlay"
        name="checkbox"
        disabled
        component={Checkbox}
      >
        Content
      </FormField>
      <FormField
        appearance="switcher"
        alertAppearance="overlay"
        name="checkbox"
        disabled
        checked
        component={Checkbox}
      >
        Content
      </FormField>
    </div>
  ))
  .add('appearance:outline radio button', () => (
    <div style={{display: 'grid', gridAutoRows: '50px'}}>
      <FormField
        appearance="outline"
        alertAppearance="overlay"
        name="checkbox"
        component={RadioButton}
      >
        Content
      </FormField>
      <FormField
        appearance="outline"
        alertAppearance="overlay"
        name="checkbox"
        checked
        component={RadioButton}
      >
        Content
      </FormField>
      <FormField
        appearance="outline"
        alertAppearance="overlay"
        name="checkbox"
        disabled
        component={RadioButton}
      >
        Content
      </FormField>
      <FormField
        appearance="outline"
        alertAppearance="overlay"
        name="checkbox"
        disabled
        component={RadioButton}
      >
        Content
      </FormField>
    </div>
  ))
  .add('appearance:outline no input', () => (
    <div style={{display: 'grid', gridAutoRows: '100px'}}>
      <FormField
        appearance="underline"
        readOnly
        alertAppearance="overlay"
        label="Email"
        name="email"
        value="Content"
        component={TextInput}
      />
      <FormField
        appearance="underline"
        readOnly
        alertAppearance="overlay"
        label="Email"
        name="email"
        value="Content"
        suffix="h"
        component={TextInput}
      />
    </div>
  ))
