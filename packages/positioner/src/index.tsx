import * as React from 'react'
import {Transition} from 'react-transition-group'
import {Portal} from '@smashing/portal'
import {Stack} from '@smashing/stack'
import {constants} from '@smashing/theme'
import getPosition from './get-position'
import styled from 'styled-components'

const {position: Position, stackingOrder: StackingOrder} = constants
export type Position =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'

const animationEasing = {
  spring: 'cubic-bezier(0.175, 0.885, 0.320, 1.175)'
}

const transitionStyles = {
  entering: {
    opacity: 1,
    visibility: 'visible',
    transform: 'scale(1)'
  },
  entered: {opacity: 1, visibility: 'visible', transform: 'scale(1)'},
  exiting: {opacity: 0, transform: 'scale(1)'},
  exited: {opacity: 0, visibility: 'hidden', transform: 'scale(.8)'}
}

const initialState = () => ({
  top: null,
  left: null,
  transformOrigin: null,
  style: transitionStyles.exited
})

interface WrapperProps {
  initialScale: number
  animationDuration: number
}

const Wrapper = styled.div.attrs({})<WrapperProps>`
  & > * {
    position: fixed;
    opacity: 0;
    transition-timing-function: ${animationEasing.spring};
    transition-duration: ${_ => _.animationDuration}ms;
    transition-property: opacity, transform;
    transform: scale(${_ => _.initialScale}) translateY(-1px);
  }
`

interface PositionerProps {
  /**
   * The position the element that is being positioned is on.
   * Smart positioning might override this.
   */
  position: Position

  /**
   * When true, show the element being positioned.
   */
  isShown: boolean

  /**
   * Function that returns the element being positioned.
   */
  children: (props: {
    state: any
    style: any
    getRef: (ref: HTMLElement | null) => void
    animationDuration: number
  }) => React.ReactNode

  /**
   * Function that returns the ref of the element being positioned.
   */
  innerRef: (ref: React.Ref<HTMLElement>) => void

  /**
   * The minimum distance from the body to the element being positioned.
   */
  bodyOffset: number

  /**
   * The minimum distance from the target to the element being positioned.
   */
  targetOffset: number

  /**
   * Function that should return a node for the target.
   */
  target: (props: {
    getRef: (ref: HTMLElement | null) => void
    isShown: boolean
  }) => React.ReactNode

  /**
   * Initial scale of the element being positioned.
   */
  initialScale: number

  /**
   * Duration of the animation.
   */
  animationDuration: number

  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete: () => void

  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete: () => void

  /**
   * Function that will be called when the enter transition is started.
   */
  onOpenStarted: () => void
}

export interface PositionerState {
  left: number | null
  top: number | null
  transformOrigin: string | null
  style: any
}

export class Positioner extends React.PureComponent<
  PositionerProps,
  PositionerState
> {
  static defaultProps = {
    position: Position.BOTTOM,
    bodyOffset: 6,
    targetOffset: 6,
    initialScale: 0.9,
    animationDuration: 160,
    innerRef: () => {},
    onOpenComplete: () => {},
    onCloseComplete: () => {},
    onOpenStarted: () => {}
  }
  state = initialState()
  latestAnimationFrame?: number
  targetRef = React.createRef<HTMLElement>().current
  positionerRef = React.createRef<HTMLElement>().current

  componentWillUnmount() {
    if (this.latestAnimationFrame) {
      cancelAnimationFrame(this.latestAnimationFrame)
    }
  }

  getTargetRef = (ref: HTMLElement | null) => {
    this.targetRef = ref
  }

  getPositionerRef = (ref: HTMLElement | null) => {
    this.positionerRef = ref
  }

  handleEnter = () => {
    this.update()
    setTimeout(() => {
      this.setState({
        style: transitionStyles.entering
      })
    }, 10)
  }

  handleEntered = () => {
    this.setState({
      style: transitionStyles.entered
    })
  }

  handleExit = () => {
    this.setState({
      style: transitionStyles.exiting
    })
  }

  handleExited = () => {
    this.setState(initialState, this.props.onCloseComplete)
  }

  update = (prevHeight = 0, prevWidth = 0) => {
    if (!this.props.isShown || !this.targetRef || !this.positionerRef) return
    const targetRect = this.targetRef.getBoundingClientRect()
    const hasEntered =
      this.positionerRef.getAttribute('data-state') === 'entered'
    const viewportHeight = document.documentElement.clientHeight
    const viewportWidth = document.documentElement.clientWidth
    let height: number
    let width: number
    if (!this.positionerRef) {
      return
    }
    if (hasEntered) {
      // Only when the animation is done should we opt-in to `getBoundingClientRect`
      const positionerRect = this.positionerRef.getBoundingClientRect()
      // https://github.com/segmentio/evergreen/issues/255
      // We need to ceil the width and height to prevent jitter when
      // the window is zoomed (when `window.devicePixelRatio` is not an integer)
      height = Math.round(positionerRect.height)
      width = Math.round(positionerRect.width)
    } else {
      // When the animation is in flight use `offsetWidth/Height` which
      // does not calculate the `transform` property as part of its result.
      // There is still change on jitter during the animation (although unoticable)
      // When the browser is zoomed in — we fix this with `Math.max`.
      height = Math.max(this.positionerRef.offsetHeight, prevHeight)
      width = Math.max(this.positionerRef.offsetWidth, prevWidth)
    }
    const {rect, transformOrigin} = getPosition({
      position: this.props.position,
      targetRect,
      targetOffset: this.props.targetOffset,
      dimensions: {
        height,
        width
      },
      viewport: {
        width: viewportWidth,
        height: viewportHeight
      },
      viewportOffset: this.props.bodyOffset
    })
    this.setState(
      {
        left: rect.left,
        top: rect.top,
        transformOrigin
      },
      () => {
        this.latestAnimationFrame = requestAnimationFrame(() => {
          this.update(height, width)
        })
      }
    )
  }

  render() {
    const {
      target,
      isShown,
      children,
      initialScale,
      animationDuration
    } = this.props

    const {left, top, transformOrigin} = this.state

    return (
      <React.Fragment>
        {target({getRef: this.getTargetRef, isShown})}

        <Stack value={StackingOrder.POSITIONER}>
          {zIndex => (
            <Transition
              in={isShown}
              appear
              mountOnEnter
              timeout={animationDuration}
              onEnter={this.handleEnter}
              onEntering={() => this.props.onOpenStarted()}
              onEntered={() => {
                this.props.onOpenComplete()
              }}
              onExit={this.handleExit}
              onExited={this.handleExited}
              unmountOnExit
            >
              {(state: any) => (
                <Portal>
                  <Wrapper
                    initialScale={initialScale}
                    animationDuration={animationDuration}
                  >
                    {children({
                      state,
                      style: {
                        ...this.state.style,
                        top,
                        left,
                        state,
                        zIndex,
                        transformOrigin
                      },
                      getRef: this.getPositionerRef,
                      animationDuration
                    })}
                  </Wrapper>
                </Portal>
              )}
            </Transition>
          )}
        </Stack>
      </React.Fragment>
    )
  }
}
