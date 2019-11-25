import * as React from 'react'
import styled, {ThemeContext, css} from 'styled-components'
import {useDefaults} from '@smashing/theme'
import {AlertIntentType, AlertAppearanceType, AlertProps} from './types'
import {Text, Strong} from '@smashing/typography'
import {
  getAlertIconForIntent,
  getTrimColorByIntent,
  CloseIconSvg
} from './styles'

interface BoxProps {
  hasTrim?: boolean
  intent?: AlertIntentType
  appearance: AlertAppearanceType
}

const Box = styled.div.attrs({})<BoxProps>`
  display: flex;
  position: relative;

  ${_ =>
    _.appearance === 'card' &&
    css`
      border-radius: 3px;
      ${_.theme.elevation.card};
    `}

  ${_ =>
    _.appearance === 'default' &&
    css`
      ${_.theme.elevation.container};
    `}

  ${_ =>
    ['card', 'default'].includes(_.appearance) &&
    css`
      background-color: #fff;

      ::before {
        content: ${_.hasTrim ? '""' : 'none'};
        width: 3px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${getTrimColorByIntent(_)};
      }
    `}
`

interface BoxInnerProps {
  appearance: AlertAppearanceType
  hasIcon: boolean
  onClickClose?: () => void
}

const BoxInner = styled.div<BoxInnerProps>`
  display: flex;
  ${_ =>
    ['card', 'default'].includes(_.appearance) &&
    css`
      padding: ${_.onClickClose ? '12px 0 12px 16px' : '12px 16px'};
    `}
`

const Title = styled(Strong)`
  display: block;
  margin: 0;
`

const Icon = styled.div`
  margin-top: 3px;
  margin-left: 2px;
  margin-right: 10px;

  svg {
    display: block;
    height: 14px;
  }
`
const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 ${_ => _.theme.spacing.xs};
  pointer-events: all;
  svg {
    color: ${_ => _.theme.colors.text.muted};
  }
  &:hover {
    cursor: pointer;
    svg {
      color: ${_ => _.theme.colors.text.default};
    }
  }
`

const Description = styled(Text)``

const Alert: React.FC<AlertProps> = ({
  children,
  title,
  className,
  onClickClose,
  ...props
}) => {
  const defaults = useDefaults('alert', props, {
    hasTrim: true,
    hasIcon: true,
    intent: 'info' as AlertIntentType,
    appearance: 'default' as AlertAppearanceType
  })
  const theme = React.useContext(ThemeContext)

  return (
    <Box
      appearance={defaults.appearance}
      intent={defaults.intent}
      hasTrim={defaults.hasTrim}
      className={className}
    >
      <BoxInner appearance={defaults.appearance} hasIcon={defaults.hasIcon}>
        {defaults.hasIcon && (
          <Icon>{getAlertIconForIntent(defaults.intent)({theme})}</Icon>
        )}
        <div>
          {typeof title === 'string' ? (
            <Title as="h4" color="intense">
              {title}
            </Title>
          ) : (
            title
          )}
          {typeof children === 'string' ? (
            <Description>{children}</Description>
          ) : (
            children
          )}
        </div>
      </BoxInner>
      {onClickClose && (
        <CloseIconWrapper onClick={onClickClose}>
          <CloseIconSvg />
        </CloseIconWrapper>
      )}
    </Box>
  )
}

export const StyledAlert = {
  Box,
  Title,
  Icon,
  Description,
  CloseIconWrapper,
  CloseIconSvg
}

export {Alert, AlertProps, AlertAppearanceType}

declare module 'styled-components' {
  export interface SmashingAlertDefaults
    extends Partial<{
      alert?: {
        intent?: AlertIntentType
        appearance?: AlertAppearanceType
        hasTrim: boolean
        hasIcon: boolean
      }
    }> {}
}
