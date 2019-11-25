import styled from 'styled-components'
import {TransitionStatus} from 'react-transition-group/Transition'
import {Alert} from '@smashing/alert'

export const ANIMATION_DURATION = 200

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
`
