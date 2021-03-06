import * as React from 'react'
import styled, {ThemeContext, css} from 'styled-components'
import {useDefaults} from '@smashing/theme'
import {AlertIntentType, AlertAppearanceType, AlertProps} from './types'
import {Text, Strong} from '@smashing/typography'
import {getAlertIconForIntent, getTrimColorByIntent} from './styles'
import {CloseButton, CloseIcon} from './close-icon'

interface BoxProps {
  hasTrim: boolean
  intent: AlertIntentType
  appearance: AlertAppearanceType
  closeOnBodyClick: boolean
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
    ${_ => _.closeOnBodyClick && {pointerEvents: 'all', cursor: 'pointer'}}
`

interface BoxInnerProps {
  appearance: AlertAppearanceType
  hasIcon: boolean
  closeOnClick?: () => void
}

const BoxInner = styled.div<BoxInnerProps>`
  display: flex;
  flex: 1;
  align-items: center;
  ${_ =>
    ['card', 'default'].includes(_.appearance) &&
    css`
      padding: 12px 16px;
    `}
  ${_ => _.closeOnClick && 'padding-right: 0;'}
`

const Title = styled(Strong)`
  display: block;
  margin: 0;
`

const Icon = styled.div`
  margin-left: 2px;
  margin-right: 10px;

  svg {
    display: block;
    height: 14px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Description = styled(Text)``

const Alert: React.FC<AlertProps> = ({
  children,
  title,
  className,
  ...props
}) => {
  const defaults = useDefaults('alert', props, {
    hasTrim: true,
    hasIcon: true,
    hasClose: false,
    closeOnBodyClick: false,
    onCloseClick: () => undefined,
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
      onClick={() => defaults.closeOnBodyClick && defaults.onCloseClick()}
      closeOnBodyClick={defaults.closeOnBodyClick}
    >
      <BoxInner
        appearance={defaults.appearance}
        hasIcon={defaults.hasIcon}
        closeOnClick={defaults.onCloseClick}
      >
        {defaults.hasIcon && (
          <Icon>{getAlertIconForIntent(defaults.intent)({theme})}</Icon>
        )}
        <Content>
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
        </Content>
      </BoxInner>
      {defaults.hasClose && (
        <CloseButton
          iconAfter={CloseIcon}
          onClick={defaults.onCloseClick}
          appearance="minimal"
          height={24}
        />
      )}
    </Box>
  )
}

export const AlertElements = {
  Box,
  BoxInner,
  Title,
  Icon,
  Description,
  CloseButton
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
