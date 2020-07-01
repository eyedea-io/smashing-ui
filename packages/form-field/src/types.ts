import {FieldProps} from '@smashing/form'
import {LabelVariant} from '@smashing/typography'

export type FormFieldLabelAppearance = 'block' | 'overlay' | 'inline'
export type FormFieldAlertAppearance = 'block' | 'overlay'
export type FormFieldProps = FieldProps & {
  /**
   * The label used above the input element.
   */
  label?: string
  /**
   * Passed on the label as a htmlFor prop.
   */
  labelFor?: string
  /**
   * The appearance of the label.
   */
  labelAppearance?: FormFieldLabelAppearance
  /**
   * Variant of the label.
   */
  labelVariant?: LabelVariant
  /**
   * If set to `false`, label wouldn't be rendered. Default set to true
   */
  hasLabel?: boolean
  /**
   * Width of label column. Only for labelAppearance='inline
   */
  labelColumnWidth?: string
  /**
   * The appearance of the alert.
   */
  alertAppearance?: FormFieldAlertAppearance
  /**
   * An optional description of the field under the label, above the input element.
   * Doesn't work with labelAppearance='overlay'
   */
  description?: string | React.ReactNode
  /**
   * An optional hint under the input element.
   */
  hint?: string | React.ReactNode
  /**
   * CSS grid-area property applied to field container. By default name will used.
   */
  gridArea?: string
  className?: string
  htmlFor?: string
}
