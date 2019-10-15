import * as React from 'react'
import {useDefaults, useTheme} from '@smashing/theme'
import {TextareaProps, TextareaAppearance, TextareaVariant} from './types'
import * as S from './styled'

const Textarea: React.FC<TextareaProps> = ({color, ...props}) => {
  const theme = useTheme()
  const defaults = useDefaults('textarea', props, {
    appearance: 'default' as TextareaAppearance,
    borderRadius: theme.radius,
    grammarly: false,
    variant: 300 as TextareaVariant
  })

  return (
    <S.Textarea
      as="textarea"
      borderRadius={defaults.borderRadius}
      appearance={defaults.appearance}
      variant={defaults.variant}
      color={props.disabled ? 'muted' : undefined}
      aria-invalid={props.invalid}
      data-gramm_editor={defaults.grammarly}
      {...props}
    />
  )
}

export {Textarea, TextareaProps}
export const TextareaComponents = S

declare module 'styled-components' {
  export interface SmashingTextareaDefaults
    extends Partial<{
      textarea: Pick<TextareaProps, 'appearance' | 'grammarly' | 'variant'>
    }> {}
}
