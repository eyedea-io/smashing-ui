import styled from 'styled-components'
import {TransitionStatus} from 'react-transition-group/Transition'

export const ANIMATION_DURATION = 200

const animationEasing = {
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.320, 1.175)'
}

export const WrapperAnimated = styled.div<{state: TransitionStatus}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 0;
  transition: all ${ANIMATION_DURATION}ms ${animationEasing.deceleration};

  ${_ => ({
    transform: _.state === 'entering' ? 'translateY(-120%)' : 'translateY(0%)',
    opacity: _.state === 'entered' ? 1 : 0
  })}
`

export const ToastsWrapper = styled.span`
  max-width: 560;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 30;
  pointer-events: none;
`

export const ToastCloseButton = styled.span`
  top: 0;
  right: 0;
  position: absolute;
  pointer-events: all;
  cursor: pointer;
  background: yellow;
  z-index: 31;
  padding: 10px;
`
