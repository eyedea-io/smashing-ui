import * as React from 'react'
import {useDefaults, useTheme} from '@smashing/theme'
import {Scrollbars} from 'react-custom-scrollbars'

import {TextareaProps, TextareaAppearance, TextareaVariant} from './types'
import * as S from './styled'

const Textarea: React.FC<TextareaProps> = ({color, ...props}) => {
  const theme = useTheme()
  const scrollContainer = React.useRef<Scrollbars>(null)
  const [isScrollVisible, setIsScrollVisible] = React.useState(false)
  const defaults = useDefaults('textarea', props, {
    appearance: 'default' as TextareaAppearance,
    borderRadius: theme.radius,
    grammarly: false,
    variant: 300 as TextareaVariant,
    full: false
  })

  const checkScroll = () => {
    if (scrollContainer.current) {
      setIsScrollVisible(
        scrollContainer.current.getScrollHeight() >
          scrollContainer.current.getClientHeight()
      )
    }
  }

  return (
    <S.TextareaContainer
      width={props.width}
      borderRadius={defaults.borderRadius}
      appearance={defaults.appearance}
      aria-invalid={props.invalid}
      full={defaults.full}
    >
      <S.ScrollbarContainer
        ref={scrollContainer}
        withscroll={isScrollVisible ? 1 : 0}
        appearance={defaults.appearance}
        renderView={scrollbarProps => (
          <S.Textarea
            {...scrollbarProps}
            {...props}
            onChange={e => {
              checkScroll()
              if (props.onChange) {
                props.onChange(e)
              }
            }}
            style={{...scrollbarProps, marginBottom: 0}}
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
