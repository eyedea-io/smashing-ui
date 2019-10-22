import * as React from 'react'
import * as styled from './styles'
import {useDefaults} from '@smashing/theme'
import {useFormContext} from '@smashing/form'
import {LabelVariant} from '@smashing/typography'
import '@smashing/theme'
import {
  FormFieldProps,
  FormFieldLabelAppearance,
  FormFieldAlertAppearance
} from './types'

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
  const {
    labelVariant,
    labelColumnWidth,
    labelAppearance,
    alertAppearance,
    ...inputProps
  } = useDefaults('formField', props, {
    labelVariant: 400 as LabelVariant,
    labelColumnWidth: '100px',
    labelAppearance: 'block' as FormFieldLabelAppearance,
    alertAppearance: 'block' as FormFieldAlertAppearance
  })
  const ErrorComponent = ErrorMessage || styled.ErrorWrapper
  const FieldComponent = Field || component || styled.DefaultInput

  return (
    <styled.FormField
      labelAppearance={labelAppearance}
      labelColumnWidth={labelColumnWidth}
      className={className}
    >
      <styled.Label
        variant={labelVariant}
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
      <FieldComponent
        name={name}
        component={component}
        id={id || name}
        {...inputProps}
      />
      <ErrorComponent
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
        labelVariant: LabelVariant
        labelColumnWidth: FormFieldLabelAppearance
        labelAppearance: FormFieldLabelAppearance
        alertAppearance: FormFieldAlertAppearance
      }
    }> {}
}
