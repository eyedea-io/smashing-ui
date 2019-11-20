import styled from 'styled-components'
import {TransitionStatus} from 'react-transition-group/Transition'
import * as React from 'react'

export const ANIMATION_DURATION = 200

const animationEasing = {
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.320, 1.175)'
}

export const ToastsWrapper = styled.span`
  max-width: 560;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 30;
  pointer-events: none;
  padding: ${_ => _.theme.spacing.xxs};
`

export const WrapperAnimated = styled.div<{state: TransitionStatus}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 0;
  transition: all ${ANIMATION_DURATION}ms ${animationEasing.deceleration};
  padding-bottom: ${_ => _.theme.spacing.xxs};
  ${_ => ({
    transform: _.state === 'entering' ? 'translateY(-120%)' : 'translateY(0%)',
    opacity: _.state === 'entered' ? 1 : 0
  })}
`
export const ToastWrapper = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
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
  width: ${_ => _.theme.spacing.lg};
  z-index: 31;
`

export const ToastCloseIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} style={{fill: 'black'}}>
    <path
      d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"
      fillRule="evenodd"
    />
  </svg>
)
