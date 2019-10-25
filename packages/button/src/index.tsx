import * as React from 'react'
import styled from 'styled-components'
import {Text} from '@smashing/typography'
import {Spinner} from '@smashing/spinner'
import {getButtonStyle} from './styles'
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

interface ButtonIconAttachmentProps {
  iconPosition?: string
}

function getIconAttachmentStyle(height: number, iconPosition?: string) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent:
      iconPosition === 'center'
        ? 'center'
        : iconPosition === 'left'
        ? 'space-between'
        : 'space-between',
    'flex-direction': iconPosition === 'left' ? 'row-reverse' : 'row',

    '.svg-wrapper': {
      display: 'flex',
      alignItems: 'center',
      marginLeft:
        iconPosition === 'center'
          ? 0
          : iconPosition === 'left'
          ? -Math.round(height / 8)
          : Math.round(height / 4),
      marginRight:
        iconPosition === 'center'
          ? 0
          : iconPosition === 'left'
          ? Math.round(height / 4)
          : -Math.round(height / 8)
    }
  }
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
  margin-right: ${_ => _.marginRight}px;
  margin-left: ${_ => _.marginLeft}px;
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
      full: false
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
            marginLeft={
              props.iconPosition === 'center'
                ? 0
                : props.iconPosition === 'left'
                ? -Math.round(defaults.height / 8)
                : Math.round(defaults.height / 4)
            }
            marginRight={
              props.iconPosition === 'center'
                ? 0
                : props.iconPosition === 'left'
                ? Math.round(defaults.height / 4)
                : -Math.round(defaults.height / 8)
            }
            size={Math.round(defaults.height / 2)}
          />
        )}
        {IconComponent && !defaults.isLoading && (
          <div className="svg-wrapper">
            <IconComponent
              className="ssvg"
              size={defaults.height / 2}
              variant="light"
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
        iconPosition?: 'left' | 'center'
      }
    }> {}
}
