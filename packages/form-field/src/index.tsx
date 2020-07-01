import * as React from 'react'
import {isArrayLike} from 'mobx'
import styled from 'styled-components'
import * as S from './styles'
import {useDefaults} from '@smashing/theme'
import {useFormContext} from '@smashing/form'
import {LabelVariant} from '@smashing/typography'
import '@smashing/theme'
import {
  FormFieldProps,
  FormFieldLabelAppearance,
  FormFieldAlertAppearance
} from './types'

const FormFieldFC = React.forwardRef<HTMLElement, FormFieldProps>(props => {
  const {
    component,
    description,
    hint,
    htmlFor,
    id,
    label,
    name,
    gridArea,
    className,
    ...restProps
  } = props
  const {Field, ErrorMessage} = useFormContext()
  const {
    labelVariant,
    labelColumnWidth,
    labelAppearance,
    alertAppearance,
    hasLabel,
    ...inputProps
  } = useDefaults('formField', restProps, {
    labelVariant: 400 as LabelVariant,
    labelColumnWidth: '100px',
    labelAppearance: 'block' as FormFieldLabelAppearance,
    alertAppearance: 'block' as FormFieldAlertAppearance,
    hasLabel: true
  })
  const ErrorComponent = ErrorMessage || (() => null)
  const FieldComponent = Field || component || S.DefaultInput
  return (
    <S.Container
      labelAppearance={labelAppearance}
      labelColumnWidth={labelColumnWidth}
      className={className}
      gridArea={gridArea || name}
    >
      {hasLabel && (
        <S.Label
          variant={labelVariant}
          appearance={labelAppearance}
          hasDescription={Boolean(description)}
          htmlFor={htmlFor || name}
        >
          {label}
        </S.Label>
      )}
      {labelAppearance === 'block' && (
        <React.Fragment>
          {description && typeof description === 'string' && (
            <S.Description>{description}</S.Description>
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
          <S.Alert
            appearance="inline"
            intent="danger"
            hasIcon={alertAppearance === 'block'}
            alertAppearance={alertAppearance}
            children={isArrayLike(children) ? children[0] : children}
          />
        )}
      />
      {hint && typeof hint === 'string' && (
        <S.Hint variant={300}>{hint}</S.Hint>
      )}
      {hint && typeof hint !== 'string' && hint}
    </S.Container>
  )
})

export const FormField = styled(FormFieldFC)``

export const FormFieldElements = S

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
