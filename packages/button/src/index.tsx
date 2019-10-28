import * as React from 'react'
import styled from 'styled-components'
import {Text} from '@smashing/typography'
import {Spinner} from '@smashing/spinner'
import {getButtonStyle, getIconAttachmentStyle} from './styles'
import {
  useDefaults,
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useTheme
} from '@smashing/theme'
import {
  ButtonIntentType,
  ButtonAppearanceType,
  ButtonProps,
  ButtonLikeProps,
  StyledTextProps,
  StyledSpinnerProps
} from './types'

type StyledComponentElement =
  | keyof JSX.IntrinsicElements
  | React.ComponentType<any>

export type ButtonIconPosition = 'left' | 'center' | 'right'

interface ButtonIconAttachmentProps {
  iconPosition?: ButtonIconPosition
}

const StyledText = styled(Text)<StyledTextProps & ButtonIconAttachmentProps>`
  border: none;
  cursor: pointer;
  border-radius: ${_ => _.borderRadius}px;
  height: ${_ => _.height}px;
  padding-left: ${_ => Math.round(_.height / 2)}px;
  padding-right: ${_ => Math.round(_.height / 2)}px;
  vertical-align: middle;
  ${_ =>
    _.full
      ? {
          width: '100%'
        }
      : {
          display: 'inline-flex'
        }}
  ${_ => getButtonStyle(_.appearance, _.intent)};
  ${_ => getIconAttachmentStyle(_.height, _.iconPosition)};
`
const StyledSpinner = styled(Spinner)<StyledSpinnerProps>`
  opacity: 0.6;
  color: ${_ => _.theme.scales.neutral.N7A};
  margin-right: ${_ =>
    _.iconPosition === 'center'
      ? 0
      : _.iconPosition === 'left'
      ? Math.round(_.height / 4)
      : -Math.round(_.height / 8)}px;
  margin-left: ${_ =>
    _.iconPosition === 'center'
      ? 0
      : _.iconPosition === 'left'
      ? -Math.round(_.height / 8)
      : Math.round(_.height / 4)}px;
  vertical-align: middle;
`

const ButtonFCFactory: <AdditionalProps extends {}>(
  as: StyledComponentElement
) => React.FC<ButtonProps> = <AdditionalProps extends {}>(
  as: StyledComponentElement = 'button'
) => {
  const ButtonFC = ({children, innerRef, ...props}) => {
    const defaults = useDefaults('button', props, {
      height: 32,
      appearance: 'default' as ButtonAppearanceType,
      intent: 'none' as ButtonIntentType,
      isLoading: false,
      full: false,
      iconPosition: 'right' as ButtonIconPosition
    })

    const theme = useTheme()

    const IconComponent = props.icon

    return (
      <StyledText
        as={as}
        borderRadius={getBorderRadiusForControlHeight(defaults.height)}
        variant={getTextSizeForControlHeight(defaults.height)}
        ref={innerRef}
        {...defaults}
        {...props}
        disabled={props.disabled || props.isLoading}
      >
        {children}
        {defaults.isLoading && (
          <StyledSpinner
            iconPosition={props.iconPosition}
            height={defaults.height}
            size={Math.round(defaults.height / 2)}
          />
        )}
        {IconComponent && !defaults.isLoading && (
          <div className="svg-wrapper">
            <IconComponent
              size={defaults.height / 2}
              color={theme.colors.text[props.intent || 'none']}
            />
          </div>
        )}
      </StyledText>
    )
  }

  return ButtonFC as React.FC<ButtonProps>
}

const Button = styled<React.FC<ButtonProps>>(ButtonFCFactory('button'))``
const ButtonAs = <T extends {}>(as: StyledComponentElement) =>
  styled(ButtonFCFactory<React.HTMLAttributes<T>>(as))``

export {
  Button,
  ButtonAs,
  ButtonProps,
  ButtonAppearanceType,
  ButtonIntentType,
  ButtonLikeProps
}

declare module 'styled-components' {
  export interface SmashingButtonDefaults
    extends Partial<{
      button?: {
        height?: number
        appearance?: ButtonAppearanceType
        intent?: ButtonIntentType
        isLoading?: boolean
        icon?: React.Component
        iconPosition?: ButtonIconPosition
      }
    }> {}
}
