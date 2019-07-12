import * as React from "react"
import {Paragraph, Heading} from "@smashing/typography"
import {Overlay} from "@smashing/overlay"
import {Button, ButtonAppearanceType} from "@smashing/button"
import styled, {keyframes} from "styled-components"
import "@smashing/theme"

const animationEasing = {
  deceleration: `cubic-bezier(0.0, 0.0, 0.2, 1)`,
  acceleration: `cubic-bezier(0.4, 0.0, 1, 1)`
}

const ANIMATION_DURATION = 200

const openAnimation = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

const closeAnimation = keyframes`
  from {
    transform: "scale(1)";
    opacity: 1;
  }
  to {
    transform: "scale(0.8)";
    opacity: 0;
  }
`

type BoxProps = {
  width: number | string
  maxWidth: number | string
  maxHeight: number | string
  sideOffsetWithUnit: number | string
  topOffsetWithUnit: number | string
}

const S = {
  Box: styled.div.attrs({})<BoxProps>`
    ${_ => _.theme.elevation.dialog};
    border-radius: ${_ => _.theme.radius};
    width: ${_ => _.width}px;
    max-width: ${_ => _.maxWidth};
    max-height: ${_ => _.maxHeight};
    margin: ${_ => _.topOffsetWithUnit} ${_ => _.sideOffsetWithUnit};
    display: flex;
    flex-direction: column;

    &[data-state="entering"],
    &[data-state="entered"] {
      animation: ${openAnimation} ${ANIMATION_DURATION}ms
        ${animationEasing.deceleration} both;
    }
    &[data-state="exiting"] {
      animation: ${closeAnimation} ${ANIMATION_DURATION}ms
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
  `,
  Header: styled.header<{isHeaderSeparated: boolean}>`
    padding: ${_ => _.theme.spacing.sm};
    flex-shrink: 0;
    display: flex;
    align-items: center;
    ${_ =>
      _.isHeaderSeparated
        ? {
            borderBottom: `1px solid ${_.theme.colors.border.muted}`
          }
        : {}}
  `,
  Title: styled(Heading)`
    flex: 1;
    margin: 0;
  `,
  Content: styled.div.attrs({})<{minHeight: string | number}>`
    padding: ${_ => _.theme.spacing.sm};
    display: flex;
    overflow: auto;
    flex-direction: column;
    min-height: ${_ => _.minHeight};
  `,
  Footer: styled.footer<{isFooterSeparated: boolean}>`
    padding: ${_ => _.theme.spacing.sm};
    display: grid;
    grid-auto-flow: column;
    column-gap: ${_ => _.theme.spacing.xxs};
    justify-content: flex-end;
    ${_ =>
      _.isFooterSeparated
        ? {
            borderTop: `1px solid ${_.theme.colors.border.muted}`
          }
        : {}}
  `
}

export const Dialog: React.FC<DialogProps> = ({
  isShown = false,
  hasHeader = true,
  hasClose = true,
  hasFooter = true,
  hasCancel = true,
  isHeaderSeparated = true,
  isFooterSeparated = true,
  intent = "info",
  width = 560,
  topOffset = "12vmin",
  sideOffset = "16px",
  minHeightContent = 80,
  cancelAppearance = "default",
  cancelLabel = "Cancel",
  confirmAppearance = "primary",
  confirmLabel = "Confirm",
  isConfirmLoading = false,
  isConfirmDisabled = false,
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEscapePress = true,
  onCancel = close => close(),
  onConfirm = close => close(),
  preventBodyScrolling = false,
  title,
  onCloseComplete,
  onOpenComplete,
  containerProps,
  contentContainerProps,
  children
}) => {
  const sideOffsetWithUnit =
    typeof sideOffset === "number" && Number.isInteger(sideOffset)
      ? `${sideOffset}px`
      : sideOffset
  const maxWidth = `calc(100% - ${sideOffsetWithUnit} * 2)`
  const topOffsetWithUnit =
    typeof topOffset === "number" && Number.isInteger(topOffset)
      ? `${topOffset}px`
      : topOffset
  const maxHeight = `calc(100% - ${topOffsetWithUnit} * 2)`
  const renderChildren = (close: () => void) => {
    if (typeof children === "function") {
      return (children as any)({close})
    }

    if (typeof children === "string") {
      return <Paragraph>{children}</Paragraph>
    }

    return children
  }

  return (
    <Overlay
      isShown={isShown}
      shouldCloseOnClick={shouldCloseOnOverlayClick}
      shouldCloseOnEscapePress={shouldCloseOnEscapePress}
      onExited={onCloseComplete}
      onEntered={onOpenComplete}
      containerProps={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
      }}
      preventBodyScrolling={preventBodyScrolling}
    >
      {({state, close}) => (
        <S.Box
          role="dialog"
          data-state={state}
          width={width}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          sideOffsetWithUnit={sideOffsetWithUnit}
          topOffsetWithUnit={topOffsetWithUnit}
          {...containerProps}
        >
          {hasHeader && (
            <S.Header isHeaderSeparated={isHeaderSeparated}>
              <S.Title as="h4" variant={600}>
                {title}
              </S.Title>
              {hasClose && (
                <S.IconButton
                  appearance="minimal"
                  onClick={() => onCancel(close)}
                >
                  <svg
                    viewBox="0 0 16 16"
                    width={14}
                    height={14}
                    style={{fill: "rgb(102, 120, 138)"}}
                  >
                    <path
                      d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"
                      fillRule="evenodd"
                    />
                  </svg>
                </S.IconButton>
              )}
            </S.Header>
          )}

          <S.Content
            data-state={state}
            minHeight={minHeightContent}
            {...contentContainerProps}
          >
            <div>{renderChildren(close)}</div>
          </S.Content>

          {hasFooter && (
            <S.Footer isFooterSeparated={isFooterSeparated}>
              {/* Cancel should be first to make sure focus gets on it first. */}
              {hasCancel && (
                <Button
                  tabIndex={0}
                  appearance={cancelAppearance}
                  onClick={() => onCancel(close)}
                >
                  {cancelLabel}
                </Button>
              )}

              <Button
                tabIndex={0}
                appearance={confirmAppearance}
                // TODO: Handle loading
                // isLoading={isConfirmLoading}
                disabled={isConfirmDisabled}
                onClick={() => onConfirm(close)}
                intent={intent}
              >
                {confirmLabel}
              </Button>
            </S.Footer>
          )}
        </S.Box>
      )}
    </Overlay>
  )
}

export interface DialogProps {
  /**
   * Children can be a string, node or a function accepting `({ close })`.
   * When passing a string, <Paragraph /> is used to wrap the string
   */
  children: React.ReactNode | React.FC<{close: () => void}>

  /**
   * The intent of the Dialog. Used for the button.
   */
  intent?: "none" | "success" | "warning" | "danger" | "info"

  /**
   * When true, the dialog is shown.
   */
  isShown?: boolean

  /**
   * When true dialog header is separated from content with border line
   */
  isHeaderSeparated?: boolean

  /**
   * When true dialog footer is separated from content with border line
   */
  isFooterSeparated?: boolean

  /**
   * Title of the Dialog. Titles should use Title Case.
   */
  title?: React.ReactNode

  /**
   * When true, the header with the title and close icon button is shown.
   */
  hasHeader?: boolean

  /**
   * When true, the footer with the cancel and confirm button is shown.
   */
  hasFooter?: boolean

  /**
   * When true, the cancel button is shown.
   */
  hasCancel?: boolean

  /**
   * When true, the close button is shown.
   */
  hasClose?: boolean

  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete?: () => void

  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete?: () => void

  /**
   * Function that will be called when the confirm button is clicked.
   * This does not close the Dialog. A close function will be passed
   * as a parameter you can use to close the dialog.
   */
  onConfirm?: (close: () => void) => void

  /**
   * Label of the confirm button.
   */
  confirmLabel?: string

  /**
   * Appearance of the confirm button.
   */
  confirmAppearance?: ButtonAppearanceType

  /**
   * When true, the confirm button is set to loading.
   */
  isConfirmLoading?: boolean

  /**
   * When true, the confirm button is set to disabled.
   */
  isConfirmDisabled?: boolean

  /**
   * Function that will be called when the cancel button is clicked.
   * This closes the Dialog by default.
   */
  onCancel?: (close: () => void) => void

  /**
   * Label of the cancel button.
   */
  cancelLabel?: string

  /**
   * Appearance of the cancel button.
   */
  cancelAppearance?: ButtonAppearanceType

  /**
   * Boolean indicating if clicking the overlay should close the overlay.
   */
  shouldCloseOnOverlayClick?: boolean

  /**
   * Boolean indicating if pressing the esc key should close the overlay.
   */
  shouldCloseOnEscapePress?: boolean

  /**
   * Width of the Dialog.
   */
  width?: string | number

  /**
   * The space above the dialog.
   * This offset is also used at the bottom when there is not enough vertical
   * space available on screen — and the dialog scrolls internally.
   */
  topOffset?: string | number

  /**
   * The space on the left/right sides of the dialog when there isn't enough
   * horizontal space available on screen.
   */
  sideOffset?: string | number

  /**
   * The min height of the body content.
   * Makes it less weird when only showing little content.
   */
  minHeightContent?: string | number

  /**
   * Props that are passed to the dialog container.
   */
  containerProps?: object

  /**
   * Props that are passed to the content container.
   */
  contentContainerProps?: object

  /**
   * Whether or not to prevent scrolling in the outer body.
   */
  preventBodyScrolling?: boolean
}
