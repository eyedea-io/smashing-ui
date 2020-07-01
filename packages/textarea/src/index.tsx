import * as React from 'react'
import {useDefaults, useTheme} from '@smashing/theme'

import {
  TextareaProps,
  TextareaAppearance,
  TextareaVariant,
  ScrollbarAppearance
} from './types'
import * as S from './styled'

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {color, className, ...restProps} = props
    const theme = useTheme()
    const scrollContainer = React.useRef<any>(null)
    const defaults = useDefaults('textarea', restProps, {
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
    const scrollbars = React.useMemo(() => {
      return defaults.scrollbarAppearance === 'outline'
        ? {
            renderTrackVertical: props => (
              <S.VerticalScrollTrack
                {...props}
                style={{...props.style, width: 2}}
              />
            ),
            renderThumbVertical: props => (
              <S.VerticalScrollThumb
                {...props}
                style={{...props.style, width: 2}}
              />
            )
          }
        : {}
    }, [defaults.scrollbarAppearance, restProps])

    return (
      <S.TextareaContainer
        className={className}
        onClick={focus}
        width={restProps.width}
        borderRadius={defaults.borderRadius}
        appearance={defaults.appearance}
        aria-invalid={restProps.invalid}
        full={defaults.full}
        disabled={restProps.disabled}
        scrollbarAppearance={defaults.scrollbarAppearance}
      >
        <S.ScrollbarContainer
          hideTracksWhenNotNeeded
          ref={scrollContainer}
          {...scrollbars}
          renderView={scrollbarProps => (
            <S.Textarea
              {...scrollbarProps}
              {...props}
              onChange={props.onChange}
              style={{marginBottom: 0}}
              data-gramm_editor={defaults.grammarly}
              as="textarea"
              ref={ref}
              color={props.disabled ? 'muted' : undefined}
              variant={defaults.variant}
            />
          )}
        ></S.ScrollbarContainer>
      </S.TextareaContainer>
    )
  }
)

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
