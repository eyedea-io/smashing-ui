```sh
yarn add @smashing/form-field @smashing/form mobx-react-lite mobx
```

#### Basic example

> `FormField` must be wrapped in `Form` component.

```tsx
import {useForm} from '@smashing/form'
import {FormField} from '@smashing/form-field'
import {TextInput} from '@smashing/text-input'

const App = () => {
  const {Form} = useForm({
    initialValues: {
      email: ''
    }
  })

  return (
    <Form>
      <FormField
        name="email"
        label="Your email"
        placeholder="Type your email..."
        component={TextInput}
      />
    </Form>
  )
}
```

#### With description

```tsx
<Form>
  <FormField
    name="email"
    label="Your email"
    placeholder="Type your email..."
    description="Lorem ipsum dolor sit ament"
    component={TextInput}
  />
</Form>
```

#### With custom description

```tsx
<Form>
  <FormField
    name="email"
    label="Your email"
    placeholder="Type your email..."
    description={<div>Lorem ipsum dolor sit ament</div>}
    component={TextInput}
  />
</Form>
```

#### With hint

```tsx
<Form>
  <FormField
    name="email"
    label="Your email"
    placeholder="Type your email..."
    hint="Lorem ipsum dolor sit ament"
    component={TextInput}
  />
</Form>
```

#### With custom hint

```tsx
<Form>
  <FormField
    name="email"
    label="Your email"
    placeholder="Type your email..."
    hint={<div>Lorem ipsum dolor sit ament</div>}
    component={TextInput}
  />
</Form>
```

#### Inline label

```tsx
<Form>
  <section style={{'--label-column-width': 200}}>
    <FormField name="firstName" labelAppearance="inline" label="firstName" />
    <FormField name="lastName" labelAppearance="inline" label="lastName" />
  </section>
  <section style={{'--label-column-width': 150}}>
    <FormField name="firstName" labelAppearance="inline" label="firstName" />
    <FormField name="lastName" labelAppearance="inline" label="lastName" />
  </section>
</Form>
```
