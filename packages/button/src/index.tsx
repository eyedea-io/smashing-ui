import * as React from 'react'
import styled from 'styled-components'
import {Text} from '@smashing/typography'
import {Spinner} from '@smashing/spinner'
import {
  getButtonStyle,
  getButtonTextColor,
  getIconAttachmentStyle,
  SvgWrapper
} from './styles'
import {
  useDefaults,
  useTheme,
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
} from '@smashing/theme'
import {
  ButtonIntentType,
  ButtonAppearanceType,
  ButtonProps,
  ButtonLikeProps,
  ButtonIconPosition,
  StyledTextProps,
  StyledSpinnerProps
} from './types'

type StyledComponentElement =
  | keyof JSX.IntrinsicElements
  | React.ComponentType<any>

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
  margin-left: 0;
  margin-right: 0;
  vertical-align: middle;
  align-items: center;
  ${_ =>
    _.full
      ? {
          display: 'flex'
        }
      : {
          display: 'inline-flex'
        }}
  ${_ => getButtonStyle(_.appearance, _.intent)};
  ${_ => (_.icon ? getIconAttachmentStyle(_.iconPosition) : {})};
  ${SvgWrapper} {
    display: flex;
    align-items: center;
    margin-left: ${_ =>
      _.iconPosition === 'center'
        ? 0
        : _.iconPosition === 'left'
        ? `${-Math.round(_.height / 8)}px`
        : `${Math.round(_.height / 4)}px`};
    margin-right: ${_ =>
      _.iconPosition === 'center'
        ? 0
        : _.iconPosition === 'left'
        ? `${Math.round(_.height / 4)}px`
        : `${-Math.round(_.height / 8)}px`};
  }
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
          <SvgWrapper>
            <IconComponent
              size={defaults.height / 2}
              color={getButtonTextColor(
                props.intent,
                props.appearance,
                props.disabled
              )({theme})}
            />
          </SvgWrapper>
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
        icon?: React.ComponentType
        iconPosition?: ButtonIconPosition
      }
    }> {}
}
