import * as React from 'react'
import {Overlay} from '@smashing/overlay'
import {Button} from '@smashing/button'
import styled, {keyframes, css} from 'styled-components'
import '@smashing/theme'
import {SideSheetProps} from './types'
import {getAnimationIn,getBoxPosition, getAnimationOut, getTransform} from './helpers'

import {constants, useDefaults} from '@smashing/theme'

const {position: Position} = constants
type Position = 'top' | 'bottom' | 'left' | 'right'

const animationEasing = {
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)'
}

const ANIMATION_DURATION = 240

type BoxProps = {
  width: number | string
  position: string
}

const S = {
  Box: styled.div.attrs({})<BoxProps>`
    ${_ => _.theme.elevation.dialog};
    border-radius: ${_ => _.theme.radius};
    width: ${_ => _.width}px;
    display: flex;
    flex-direction: column;
    transform:  ${_ => getTransform(_.position)};
    ${_ => getBoxPosition(_.position)};
    &[data-state="entering"],
    &[data-state="entered"] {
      animation: ${_ => getAnimationIn(_.position)} ${ANIMATION_DURATION}ms
        ${animationEasing.deceleration} both;
    }
    &[data-state="exiting"] {
      animation: ${_ => getAnimationOut(_.position)}  ${ANIMATION_DURATION}ms
        ${animationEasing.acceleration} both;
    }
  `,
  IconButton: styled(Button)`
    width: 32px;
    height: 32px;
    padding-left: 0;
    padding-right: 0;
    display: flex;
    justify-content: center;
  `
}

const SideSheetFC: React.FC<SideSheetProps> = ({
  children,
  containerProps,
  ...props
}) => {
  const defaults = useDefaults('sideSheet', props, {
    width: 620,
    onCloseComplete: () => {},
    onOpenComplete: () => {},
    onBeforeClose: () => true,
    shouldCloseOnOverlayClick: true,
    shouldCloseOnEscapePress: true,
    position: Position.LEFT,
    isShown: false,
    preventBodyScrolling: false
  })

  const renderChildren = (close: () => void) => {
    if (typeof children === 'function') {
      return (children as any)({close})
    }
    return children
  }

  return (
    <Overlay
      isShown={defaults.isShown}
      shouldCloseOnClick={defaults.shouldCloseOnOverlayClick}
      shouldCloseOnEscapePress={defaults.shouldCloseOnEscapePress}
      onBeforeClose={defaults.onBeforeClose}
      onExited={defaults.onCloseComplete}
      onEntered={defaults.onOpenComplete}
      preventBodyScrolling={defaults.preventBodyScrolling}
    >
      {({state, close}) => (
        <S.Box
          role="dialog"
          data-state={state}
          width={defaults.width}
          position={defaults.position}
        >
          {/* TODO: add isClosing bool */}
          <S.IconButton appearance="minimal" onClick={close}>
            <svg
              viewBox="0 0 16 16"
              width={14}
              height={14}
              style={{fill: 'rgb(102, 120, 138)'}}
            >
              <path
                d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"
                fillRule="evenodd"
              />
            </svg>
          </S.IconButton>
          <div>{renderChildren(close)}</div>
        </S.Box>
      )}
    </Overlay>
  )
}

const SideSheet = styled(SideSheetFC)``

export {SideSheet, SideSheetProps}

declare module 'styled-components' {
  export interface SmashingSideSheetDefaults
    extends Partial<{
      sideSheet?: {
        width?: number
        onCloseComplete?: () => void
        onOpenComplete?: () => void
        onBeforeClose?: () => boolean
        shouldCloseOnOverlayClick?: boolean
        shouldCloseOnEscapePress?: boolean
        position?: any //TODO: fix position type
        isShown?: boolean
        preventBodyScrolling?: boolean
      }
    }> {}
}
