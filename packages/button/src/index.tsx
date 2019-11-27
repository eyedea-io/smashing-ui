import * as React from 'react'
import styled from 'styled-components'
import {Text as PureText} from '@smashing/typography'
import {Spinner as PureSpinner} from '@smashing/spinner'
import {getButtonStyle, getButtonTextColor} from './styles'
import {
  useDefaults,
  getValueWithUnit,
  useTheme,
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

import {} from '.'

type StyledComponentElement =
  | keyof JSX.IntrinsicElements
  | React.ComponentType<any>

interface IconWrapperProps {
  height: number
  iconPosition: 'before' | 'after' | 'center'
}

const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  ${_ => ({
    order: _.iconPosition === 'before' ? -1 : undefined
  })}
  margin-left: ${_ =>
    ({
      center: 0,
      before: `${-Math.round(_.height / 8)}px`,
      after: `${Math.round(_.height / 4)}px`
    }[_.iconPosition])};
  margin-right: ${_ =>
    ({
      center: 0,
      before: `${Math.round(_.height / 4)}px`,
      after: `${-Math.round(_.height / 8)}px`
    }[_.iconPosition])};
`
const Container = styled(PureText)<StyledTextProps>`
  border: none;
  cursor: pointer;
  border-radius: ${_ => _.borderRadius}px;
  height: ${_ => _.height}px;
  padding-left: ${_ => Math.round(_.height / 2)}px;
  padding-right: ${_ => Math.round(_.height / 2)}px;
  margin-left: 0;
  margin-right: 0;
  vertical-align: middle;
  ${_ => ({
    width: _.width ? getValueWithUnit(_.width) : _.full ? '100%' : undefined,
    display: _.full ? undefined : 'inline-flex'
  })}
  align-items: center;
  ${_ => getButtonStyle(_.appearance, _.intent)};
  ${_ => ({
    width: _.full ? '100%' : undefined,
    justifyContent: _.full ? 'center' : undefined,
    display: _.full ? 'flex' : 'inline-flex'
  })}
`
const Spinner = styled(PureSpinner)<StyledSpinnerProps>`
  opacity: 0.6;
  color: ${_ => _.theme.scales.neutral.N7A};
`

const ButtonFCFactory: <AdditionalProps extends {}>(
  as: StyledComponentElement
) => React.FC<ButtonProps> = <AdditionalProps extends {}>(
  as: StyledComponentElement = 'button'
) => {
  const ButtonFC = ({
    children,
    innerRef,
    iconAfter: IconAfter,
    iconBefore: IconBefore,
    ...props
  }) => {
    const defaults = useDefaults('button', props, {
      height: 32,
      appearance: 'default' as ButtonAppearanceType,
      intent: 'none' as ButtonIntentType,
      isLoading: false,
      full: false
    })
    const theme = useTheme()
    const loaderIconPosition =
      children === undefined ? 'center' : IconBefore ? 'before' : 'after'
    const iconProps = {
      size: Math.round(defaults.height / 2),
      color: getButtonTextColor(props.intent, props.appearance, props.disabled)(
        {theme}
      )
    }

    return (
      <Container
        as={as}
        borderRadius={getBorderRadiusForControlHeight(defaults.height)}
        variant={getTextSizeForControlHeight(defaults.height)}
        ref={innerRef}
        {...defaults}
        {...props}
        aria-invalid={props.invalid}
        disabled={props.disabled || props.isLoading}
      >
        {IconBefore && (
          <IconWrapper
            iconPosition={children ? 'before' : 'center'}
            height={defaults.height}
          >
            <IconBefore {...iconProps} />
          </IconWrapper>
        )}

        {children}

        {/* TODO: Handle loader position */}
        {defaults.isLoading && (
          <IconWrapper
            iconPosition={loaderIconPosition}
            height={defaults.height}
          >
            <Spinner height={defaults.height} size={iconProps.size} />
          </IconWrapper>
        )}

        {IconAfter && !defaults.isLoading && (
          <IconWrapper
            iconPosition={children ? 'after' : 'center'}
            height={defaults.height}
          >
            <IconAfter {...iconProps} />
          </IconWrapper>
        )}
      </Container>
    )
  }

  return ButtonFC as React.FC<ButtonProps>
}

const Button = styled<React.FC<ButtonProps>>(ButtonFCFactory('button'))``
const ButtonAs = <T extends {}>(as: StyledComponentElement) =>
  styled(ButtonFCFactory<React.HTMLAttributes<T>>(as))``
const StyledButton = {Spinner, Container, IconWrapper}

export {
  Button,
  ButtonAs,
  ButtonProps,
  ButtonAppearanceType,
  ButtonIntentType,
  ButtonLikeProps,
  StyledButton
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
