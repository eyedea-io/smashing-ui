import * as React from 'react'
import styled from 'styled-components'
import {Text} from '@smashing/typography'
import {Spinner} from '@smashing/spinner'
import {getButtonStyle} from './styles'
import {
  useDefaults,
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
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

const StyledText = styled(Text)<StyledTextProps>`
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
`
const StyledSpinner = styled(Spinner)<StyledSpinnerProps>`
  opacity: 0.6;
  color: ${_ => _.theme.scales.neutral.N7A};
  margin-right: ${_ => _.marginRight}px;
  margin-left: ${_ => _.marginLeft}px;
  vertical-align: middle;
`

const ButtonFCFactory: <AdditionalProps extends {}>(
  as: any
) => React.FC<ButtonProps> = <AdditionalProps extends {}>(
  as: StyledComponentElement = 'button'
) => ({children, innerRef, ...props}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const defaults = useDefaults('button', props, {
    height: 32,
    appearance: 'default' as ButtonAppearanceType,
    intent: 'none' as ButtonIntentType,
    isLoading: false,
    full: false
  })

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
      {defaults.isLoading && (
        <StyledSpinner
          marginLeft={-Math.round(defaults.height / 8)}
          marginRight={Math.round(defaults.height / 4)}
          size={Math.round(defaults.height / 2)}
        />
      )}
      {children}
    </StyledText>
  )
}

const Button = styled<React.FC<ButtonProps>>(ButtonFCFactory('button'))``
const ButtonAs = <T extends {}>(as?: StyledComponentElement) =>
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
      }
    }> {}
}
