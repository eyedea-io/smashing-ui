import styled from 'styled-components'
import {TransitionStatus} from 'react-transition-group/Transition'
import * as React from 'react'
import {Alert} from '@smashing/alert'
import {ANIMATION_DURATION} from './toast'

const animationEasing = {
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)',
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.320, 1.175)'
}

export const ToastWrapperAnimated = styled.div<{state: TransitionStatus}>`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 0;
  padding-bottom: ${_ => _.theme.spacing.xxs};
  transition: all ${ANIMATION_DURATION}ms ${animationEasing.deceleration};
  ${_ => ({
    transform: _.state === 'entering' ? 'translateY(-120%)' : 'translateY(0%)',
    opacity: _.state === 'entered' ? 1 : 0
  })}
`

export const ToastsWrapper = styled.span`
  left: 0;
  right: 0;
  top: 0;
  z-index: 30;
  max-width: 560;
  padding: ${_ => _.theme.spacing.xxs};
  pointer-events: none;
  position: fixed;
`

export const ToastAlert = styled(Alert)``

export const ToastWrapper = styled.div<{hasCloseButton?: boolean}>`
  box-sizing: border-box;
  position: relative;
  ${ToastAlert} {
    ${_ => _.hasCloseButton && {paddingRight: _.theme.spacing.xl}}
  }
`

const CloseIcon: React.FC = props => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...props}>
    <path
      d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"
      fillRule="evenodd"
      fill="currentColor"
    />
  </svg>
)

export const ToastCloseIcon = styled(CloseIcon)`
  color: ${_ => _.theme.colors.text.muted};
  padding: 0 ${_ => _.theme.spacing.xs};
`

export const ToastCloseIconWrapper = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  pointer-events: all;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 31;
  &:hover ${ToastCloseIcon} {
    color: ${_ => _.theme.colors.text.default};
  }
`
