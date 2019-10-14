import * as React from 'react'
import * as styled from './styles'
import {useDefaults} from '@smashing/theme'
import {useFormContext} from '@smashing/form'
import '@smashing/theme'
import {
  FormFieldProps,
  FormFieldLabelAppearance,
  FormFieldAlertAppearance
} from './types'

const INVALID_CONTEXT_MESSAGE = `[@smashing/form-field] FormField can be used only in @smashing/form context:
const {Form} = useForm({/* Your form config */})

return (
  <Form>
    <FormField component={Input} name="email" />
  </Form>
)
`

export const FormField: React.FC<FormFieldProps> = ({
  component,
  description,
  hint,
  htmlFor,
  id,
  label,
  name,
  className,
  ...props
}) => {
  const {Field, ErrorMessage} = useFormContext()
  const {labelAppearance, alertAppearance, ...inputProps} = useDefaults(
    'formField',
    props,
    {
      labelAppearance: 'block' as FormFieldLabelAppearance,
      alertAppearance: 'block' as FormFieldAlertAppearance
    }
  )

  if (!ErrorMessage || !Field) {
    console.error(INVALID_CONTEXT_MESSAGE)
    return null
  }

  return (
    <styled.FormField labelAppearance={labelAppearance} className={className}>
      <styled.Label
        appearance={labelAppearance}
        hasDescription={Boolean(description)}
        htmlFor={htmlFor || name}
      >
        {label}
      </styled.Label>
      {labelAppearance === 'block' && (
        <React.Fragment>
          {description && typeof description === 'string' && (
            <styled.Description>{description}</styled.Description>
          )}
          {description && typeof description !== 'string' && description}
        </React.Fragment>
      )}
      <Field
        name={name}
        component={component}
        id={id || name}
        {...inputProps}
      />
      <ErrorMessage
        name={name}
        component={({children}) => (
          <styled.Alert
            appearance="inline"
            intent="danger"
            hasIcon={alertAppearance === 'block'}
            alertAppearance={alertAppearance}
            children={children}
          />
        )}
      />
      {hint && typeof hint === 'string' && (
        <styled.Hint variant={300}>{hint}</styled.Hint>
      )}
      {hint && typeof hint !== 'string' && hint}
    </styled.FormField>
  )
}

export const StyledFormField = styled

declare module 'styled-components' {
  export interface SmashingFormFieldDefaults
    extends Partial<{
      formField: {
        labelAppearance: FormFieldLabelAppearance
        alertAppearance: FormFieldAlertAppearance
      }
    }> {}
}
