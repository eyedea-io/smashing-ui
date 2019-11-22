import * as React from 'react'
import {useDefaults, useTheme} from '@smashing/theme'
import {Scrollbars} from 'react-custom-scrollbars'

import {
  TextareaProps,
  TextareaAppearance,
  TextareaVariant,
  ScrollbarAppearance
} from './types'
import * as S from './styled'

const Textarea: React.FC<TextareaProps> = ({color, ...props}) => {
  const theme = useTheme()
  const scrollContainer = React.useRef<Scrollbars>(null)
  const defaults = useDefaults('textarea', props, {
    appearance: 'default' as TextareaAppearance,
    scrollbarAppearance: 'default' as ScrollbarAppearance,
    borderRadius: theme.radius,
    grammarly: false,
    variant: 300 as TextareaVariant,
    full: false
  })

  const focus = () => {
    if (scrollContainer.current) {
      scrollContainer.current.view.focus()
    }
  }

  return (
    <S.TextareaContainer
      onClick={focus}
      width={props.width}
      borderRadius={defaults.borderRadius}
      appearance={defaults.appearance}
      aria-invalid={props.invalid}
      full={defaults.full}
      scrollbarAppearance={defaults.scrollbarAppearance}
    >
      <S.ScrollbarContainer
        hideTracksWhenNotNeeded
        scrollbarAppearance={defaults.scrollbarAppearance}
        ref={scrollContainer}
        appearance={defaults.appearance}
        renderView={scrollbarProps => (
          <S.Textarea
            {...scrollbarProps}
            {...props}
            onChange={props.onChange}
            style={{marginBottom: 0}}
            data-gramm_editor={defaults.grammarly}
            as="textarea"
            color={props.disabled ? 'muted' : undefined}
            variant={defaults.variant}
          />
        )}
      ></S.ScrollbarContainer>
    </S.TextareaContainer>
  )
}

export {Textarea, TextareaProps}
export const TextareaComponents = S

declare module 'styled-components' {
  export interface SmashingTextareaDefaults
    extends Partial<{
      textarea: Pick<
        TextareaProps,
        'appearance' | 'grammarly' | 'variant' | 'full'
      >
    }> {}
}
