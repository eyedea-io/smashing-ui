import React, {PureComponent} from "react"
import debounce from "debounce"
import {Positioner} from "@smashing/positioner"
import {constants} from "@smashing/theme"
import {Paragraph} from "@smashing/typography"
import styled, {css} from "styled-components"
import tinycolor from "tinycolor2"

const {position: Position} = constants
export type Position =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"

export interface BoxProps {
  appearance: "default" | "card"
}

const Box = styled.div.attrs({})<BoxProps>`
  border-radius: 3px;
  padding: 4px 8px;
  max-width: 240px;

  ${_ =>
    _.appearance === "default" &&
    css`
      background-color: ${tinycolor(_.theme.palette.neutral.base)
        .setAlpha(0.95)
        .toString()};
    `}
  ${_ =>
    _.appearance === "card" &&
    css`
      backgroundcolor: "white";
      box-shadow: 0 0 1px ${_ => _.theme.scales.neutral.N6A},
        0 8px 10px -4px ${_ => _.theme.scales.neutral.N5A};
    `}
`

interface StyledParagraphProps {
  variant: 400
  appearance: "default" | "card"
}

const StyledParagraph = styled(Paragraph).attrs({})<StyledParagraphProps>`
  margin: 0;

  ${_ =>
    _.appearance === "default" &&
    css`
      color: white;
    `};
`

class TooltipStateless extends React.Component<{
  children: React.ReactNode
  /**
   * The appearance of the tooltip.
   */
  appearance: "default" | "card"
  id: string
  style: any
  onMouseEnter: React.MouseEventHandler
  onMouseLeave: React.MouseEventHandler
  innerRef: any
}> {
  render() {
    const {children, appearance, innerRef, ...props} = this.props
    let child: React.ReactNode

    if (typeof children === "string") {
      child = (
        <StyledParagraph variant={400} appearance={appearance}>
          {children}
        </StyledParagraph>
      )
    } else {
      child = children
    }

    return (
      <Box ref={innerRef} appearance={appearance} {...props}>
        {child}
      </Box>
    )
  }
}

let idCounter = 0

export interface TooltipProps {
  /**
   * The appearance of the tooltip.
   */
  appearance: "default" | "card"

  /**
   * The position the Popover is on.
   */
  position: Position

  /**
   * The content of the Popover.
   */
  content: React.ReactNode

  /**
   * Time in ms before hiding the Tooltip.
   */
  hideDelay: number

  /**
   * When True, manually show the Tooltip.
   */
  isShown?: boolean

  /**
   * The target button of the Tooltip.
   */
  children: React.ReactElement

  /**
   * Properties passed through to the Tooltip.
   */
  statelessProps?: {
    [key: string]: any
  }

  popoverProps?: any
}

export interface TooltipState {
  id: string
  isShown?: boolean
  isShownByTarget: boolean
}

export class Tooltip extends PureComponent<TooltipProps, TooltipState> {
  static defaultProps = {
    appearance: "default",
    position: Position.BOTTOM,
    hideDelay: 120
  }

  state = {
    id: `smashing-tooltip-${++idCounter}`,
    isShown: this.props.isShown,
    isShownByTarget: false
  }

  show = () => {
    if (this.state.isShown) return
    this.setState({
      isShown: true
    })
  }

  hide = debounce(() => {
    if (!this.state.isShown) return
    this.setState({
      isShown: false
    })
  }, this.props.hideDelay)

  renderTarget = ({getRef}) => {
    const {children} = this.props

    const tooltipTargetProps = {
      onMouseEnter: this.show,
      onMouseLeave: this.hide,
      "aria-describedby": this.state.id
    }

    /**
     * Tooltips can be used within a Popover (not the other way around)
     * When a Tooltip is used within a Popover, the Popover passes
     * its props to the Tooltip in a `popoverProps` object.
     */
    if (this.props.popoverProps) {
      const {
        getTargetRef,
        isShown,
        ...popoverTargetProps
      } = this.props.popoverProps

      return React.cloneElement(children, {
        // Add the Popover props to the target.
        ...popoverTargetProps,
        // Add the Tooltip props to the target.
        ...tooltipTargetProps,

        innerRef: ref => {
          // Get the ref for the Tooltip.
          getRef(ref)
          // Pass the ref to the Popover.
          getTargetRef(ref)
        }
      })
    }

    /**
     * With normal usage only the props for a Tooltip are passed to the target.
     */
    return React.cloneElement(children, {
      ...tooltipTargetProps,
      innerRef: getRef
    })
  }

  isPopoverShown = () =>
    this.props.popoverProps && this.props.popoverProps.isShown

  handleMouseEnterTarget = () => {
    this.setState({
      isShownByTarget: true
    })
  }

  handleMouseLeaveTarget = debounce(() => {
    this.setState({
      isShownByTarget: false
    })
  }, this.props.hideDelay)

  render() {
    const {appearance, isShown, content, position, statelessProps} = this.props
    const {isShown: stateIsShown, isShownByTarget} = this.state

    let shown =
      (isShown || stateIsShown || isShownByTarget) && !this.isPopoverShown()

    // Tooltip was explicitly set to not be shown
    if (isShown === false) {
      shown = false
    }

    return (
      <Positioner
        target={this.renderTarget}
        isShown={shown}
        position={position}
        animationDuration={160}
      >
        {({style, state, getRef}) => (
          <TooltipStateless
            id={this.state.id}
            appearance={appearance}
            innerRef={ref => getRef(ref as any)}
            data-state={state}
            style={style}
            onMouseEnter={this.handleMouseEnterTarget}
            onMouseLeave={this.handleMouseLeaveTarget}
            {...statelessProps}
          >
            {content}
          </TooltipStateless>
        )}
      </Positioner>
    )
  }
}
