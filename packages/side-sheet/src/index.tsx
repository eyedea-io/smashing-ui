import * as React from 'react'
import {Overlay} from '@smashing/overlay'
import {Button} from '@smashing/button'
import styled from 'styled-components'
import '@smashing/theme'
import {SideSheetProps} from './types'
import {
  getAnimationIn,
  getBoxPosition,
  getAnimationOut,
  getTransform,
  getIconPosition,
  getContentSize,
  getWidthType
} from './helpers'
import {constants, useDefaults} from '@smashing/theme'

const {position: Position} = constants
type Position = 'top' | 'bottom' | 'left' | 'right'

const animationEasing = {
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)'
}

const ANIMATION_DURATION = 240

type BoxProps = {
  width?: number | string
  position: string
}

type IconProps = {
  size: number | string
  position: string
  isClosing?: boolean
}

const S = {
  Box: styled.div.attrs({})<BoxProps>`
    display: flex;
    flex-direction: column;
    transform: ${_ => getTransform(_.position)};
    ${_ => ({
      width: getWidthType(_.width),
      ...getBoxPosition(_.position)
    })};
    &[data-state='entered'] {
      animation: ${_ => getAnimationIn(_.position)} ${ANIMATION_DURATION}ms
        ${animationEasing.deceleration} both;
    }
    &[data-state='exiting'] {
      animation: ${_ => getAnimationOut(_.position)} ${ANIMATION_DURATION}ms
        ${animationEasing.acceleration} both;
    }
  `,
  Content: styled.div.attrs({})<BoxProps>`
    ${_ => ({
      ..._.theme.elevation.dialog,
      ...getContentSize(_.position)
    })}
    overflow: auto;
  `,
  IconButton: styled(Button)<IconProps>`
    width: ${_ => _.size}px;
    height: ${_ => _.size}px;
    display: flex;
    padding: 0;
    justify-content: center;
    border-radius: 30em;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.33);
    ${_ => getIconPosition(_.position)};

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      box-shadow: 0 0 0 4px ${_ => _.theme.scales.blue.B6A};
      background-color: rgba(255, 255, 255, 0.5);
    }

    &:active {
      box-shadow: none;
      background-color: rgba(0, 0, 0, 0.17);
    }

    &[data-state='entered'] {
      animation: ${_ => getAnimationIn(_.position)} ${ANIMATION_DURATION}ms
        ${animationEasing.deceleration} both;
    }
    &[data-state='exiting'] {
      animation: ${_ => getAnimationOut(_.position)} ${ANIMATION_DURATION}ms
        ${animationEasing.acceleration} both;
    }
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
    preventBodyScrolling: false,
    size: 34,
    isClosing: false,
    isClosingButtonVisible: true
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
          {defaults.isClosingButtonVisible && (
            <S.IconButton
              appearance="minimal"
              size={defaults.size}
              position={defaults.position}
              onClick={close}
              isClosing={false}
            >
              <svg
                viewBox="0 0 16 16"
                width={defaults.size / 2}
                height={defaults.size / 2}
                style={{fill: 'white'}}
              >
                <path
                  d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"
                  fillRule="evenodd"
                />
              </svg>
            </S.IconButton>
          )}
          <S.Content
            data-state={state}
            width={defaults.width}
            position={defaults.position}
            {...containerProps}
          >
            <div>{renderChildren(close)}</div>
          </S.Content>
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
        width?: number | string
        onCloseComplete?: () => void
        onOpenComplete?: () => void
        onBeforeClose?: () => boolean
        shouldCloseOnOverlayClick?: boolean
        shouldCloseOnEscapePress?: boolean
        position?: string
        isShown?: boolean
        preventBodyScrolling?: boolean
        size?: number
        isClosing?: boolean
        isClosingButtonVisible: boolean
      }
    }> {}
}
