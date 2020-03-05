import {constants} from '@smashing/theme'

const {position: Position} = constants

type Position = typeof Position

interface Rect {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

interface Dimensions {
  width: number
  height: number
}

interface Coordinates {
  x: number
  y: number
}

/**
 * Function to create a Rect with rounded values.
 */
const makeCeiledRect = (
  {width, height}: {width: number; height: number},
  {left, top}: {left: number; top: number}
): Rect => {
  const ceiledLeft = Math.ceil(left)
  const ceiledTop = Math.ceil(top)
  return {
    width,
    height,
    left: ceiledLeft,
    top: ceiledTop,
    right: ceiledLeft + width,
    bottom: ceiledTop + height
  }
}

/**
 * Function to create a Rect.
 */
const makeRect = (
  {width, height}: {width: number; height: number},
  {left, top}: {left: number; top: number}
): Rect => ({
  width,
  height,
  left: left,
  top: top,
  right: left + width,
  bottom: top + height
})

/**
 * Function to flip a position upside down.
 */
const flipHorizontal = (position: string) => {
  switch (position) {
    case Position.TOP_LEFT:
      return Position.BOTTOM_LEFT
    case Position.TOP:
    default:
      return Position.BOTTOM
    case Position.TOP_RIGHT:
      return Position.BOTTOM_RIGHT
    case Position.BOTTOM_LEFT:
      return Position.TOP_LEFT
    case Position.BOTTOM:
      return Position.TOP
    case Position.BOTTOM_RIGHT:
      return Position.TOP_RIGHT
  }
}

/**
 * Function that returns if position is aligned on top.
 */
const isAlignedOnTop = (position: string) => {
  switch (position) {
    case Position.TOP_LEFT:
    case Position.TOP:
    case Position.TOP_RIGHT:
      return true
    default:
      return false
  }
}

/**
 * Function that returns if position is aligned left or right.
 */
const isAlignedHorizontal = (position: string) => {
  switch (position) {
    case Position.LEFT:
    case Position.RIGHT:
      return true
    default:
      return false
  }
}

/**
 * Function that returns if a rect fits on bottom.
 */
const getFitsOnBottom = (
  rect: Rect,
  viewport: Dimensions,
  viewportOffset: number
) => {
  return rect.bottom < viewport.height - viewportOffset
}

/**
 * Function that returns if a rect fits on top.
 */
const getFitsOnTop = (rect: Rect, viewportOffset: number) => {
  return rect.top > viewportOffset
}

/**
 * Function that returns if a rect fits on right.
 */
const getFitsOnRight = (
  rect: Rect,
  viewport: Dimensions,
  viewportOffset: number
) => {
  return rect.right < viewport.width - viewportOffset
}

/**
 * Function that returns if a rect fits on left.
 */
const getFitsOnLeft = (rect: Rect, viewportOffset: number) => {
  return rect.left > viewportOffset
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
 * Function that returns the CSS `tranform-origin` property.
 */
const getTransformOrigin = ({
  rect,
  position,
  dimensions,
  targetCenter
}: {
  rect: Rect
  position: string
  dimensions: Dimensions
  targetCenter: number
}) => {
  const centerY = Math.round(targetCenter - rect.top)

  if (position === Position.LEFT) {
    /* Syntax: x-offset | y-offset */
    return `${dimensions.width}px ${centerY}px`
  }

  if (position === Position.RIGHT) {
    /* Syntax: x-offset | y-offset */
    return `0px ${centerY}px`
  }

  const centerX = Math.round(targetCenter - rect.left)

  if (isAlignedOnTop(position)) {
    /* Syntax: x-offset | y-offset */
    return `${centerX}px ${dimensions.height}px `
  }

  /* Syntax: x-offset | y-offset */
  return `${centerX}px 0px `
}

/**
 * Function that takes in numbers and position and gives the final coords.
 * @param {Position} position — the position the positioner should be on.
 * @param {Object} dimensions — the dimensions of the positioner.
 * @param {Object} targetRect — the rect of the target.
 * @param {Number} targetOffset - offset from the target.
 * @param {Object} viewport - the width and height of the viewport.
 * @param {Object} viewportOffset - offset from the viewport.
 * @return {Object} - { x: Number, y: Number }
 */
export default function getFittedPosition({
  position,
  dimensions,
  targetRect,
  targetOffset,
  viewport,
  viewportOffset = 8,
  exactPosition = false
}: {
  position: string
  dimensions: Dimensions
  targetRect: Rect
  targetOffset: number
  viewport: Dimensions
  viewportOffset: number
  exactPosition?: boolean
}): {
  rect: Rect
  position: string
  transformOrigin: string
} {
  const {rect, position: finalPosition} = getPosition({
    position,
    dimensions,
    targetRect,
    targetOffset,
    viewport,
    viewportOffset,
    exactPosition
  })

  // Push rect to the right if overflowing on the left side of the viewport.
  if (rect.left < viewportOffset) {
    rect.right += exactPosition
      ? Math.abs(rect.left - viewportOffset)
      : Math.ceil(Math.abs(rect.left - viewportOffset))
    rect.left = exactPosition ? viewportOffset : Math.ceil(viewportOffset)
  }

  // Push rect to the left if overflowing on the right side of the viewport.
  if (rect.right > viewport.width - viewportOffset) {
    const delta = exactPosition
      ? rect.right - (viewport.width - viewportOffset)
      : Math.ceil(rect.right - (viewport.width - viewportOffset))
    rect.left -= delta
    rect.right -= delta
  }

  // Push rect down if overflowing on the top side of the viewport.
  if (rect.top < viewportOffset) {
    rect.top += exactPosition
      ? Math.abs(rect.top - viewportOffset)
      : Math.ceil(Math.abs(rect.top - viewportOffset))
    rect.bottom = exactPosition ? viewportOffset : Math.ceil(viewportOffset)
  }

  // Push rect up if overflowing on the bottom side of the viewport.
  if (rect.bottom > viewport.height - viewportOffset) {
    const delta = exactPosition
      ? rect.bottom - (viewport.height - viewportOffset)
      : Math.ceil(rect.bottom - (viewport.height - viewportOffset))
    rect.top -= delta
    rect.right -= delta
  }

  const targetCenter = isAlignedHorizontal(position)
    ? targetRect.top + targetRect.height / 2
    : targetRect.left + targetRect.width / 2

  const transformOrigin = getTransformOrigin({
    rect,
    position: finalPosition,
    dimensions,
    targetCenter
  })

  return {
    rect,
    position: finalPosition,
    transformOrigin
  }
}

/**
 * Function that takes in numbers and position and gives the final coords.
 */
function getPosition({
  position,
  dimensions,
  targetRect,
  targetOffset,
  viewport,
  viewportOffset = 8,
  exactPosition = false
}: {
  position: string
  dimensions: Dimensions
  targetRect: Rect
  targetOffset: number
  viewport: Dimensions
  viewportOffset: number
  exactPosition?: boolean
}) {
  const isHorizontal = isAlignedHorizontal(position)

  // Handle left and right positions
  if (isHorizontal) {
    const leftRect = getRect({
      position: Position.LEFT,
      dimensions,
      targetRect,
      targetOffset,
      exactPosition
    })

    const rightRect = getRect({
      position: Position.RIGHT,
      dimensions,
      targetRect,
      targetOffset,
      exactPosition
    })

    const fitsOnLeft = getFitsOnLeft(leftRect, viewportOffset)
    const fitsOnRight = getFitsOnRight(rightRect, viewport, viewportOffset)

    if (position === Position.LEFT) {
      if (fitsOnLeft) {
        return {
          position,
          rect: leftRect
        }
      }

      if (fitsOnRight) {
        return {
          position: Position.RIGHT,
          rect: rightRect
        }
      }
    }

    if (position === Position.RIGHT) {
      if (fitsOnRight) {
        return {
          position,
          rect: rightRect
        }
      }

      if (fitsOnLeft) {
        return {
          position: Position.LEFT,
          rect: leftRect
        }
      }
    }

    // Default to using the position with the most space
    const spaceRight = Math.abs(
      viewport.width - viewportOffset - rightRect.right
    )
    const spaceLeft = Math.abs(leftRect.left - viewportOffset)

    if (spaceRight < spaceLeft) {
      return {
        position: Position.RIGHT,
        rect: rightRect
      }
    }

    return {
      position: Position.LEFT,
      rect: leftRect
    }
  }

  const positionIsAlignedOnTop = isAlignedOnTop(position)
  let topRect: Rect
  let bottomRect: Rect

  if (positionIsAlignedOnTop) {
    topRect = getRect({
      position,
      dimensions,
      targetRect,
      targetOffset,
      exactPosition
    })
    bottomRect = getRect({
      position: flipHorizontal(position),
      dimensions,
      targetRect,
      targetOffset,
      exactPosition
    })
  } else {
    topRect = getRect({
      position: flipHorizontal(position),
      dimensions,
      targetRect,
      targetOffset,
      exactPosition
    })
    bottomRect = getRect({
      position,
      dimensions,
      targetRect,
      targetOffset,
      exactPosition
    })
  }

  const topRectFitsOnTop = getFitsOnTop(topRect, viewportOffset)

  const bottomRectFitsOnBottom = getFitsOnBottom(
    bottomRect,
    viewport,
    viewportOffset
  )

  if (positionIsAlignedOnTop) {
    if (topRectFitsOnTop) {
      return {
        position,
        rect: topRect
      }
    }

    if (bottomRectFitsOnBottom) {
      return {
        position: flipHorizontal(position),
        rect: bottomRect
      }
    }
  }

  if (!positionIsAlignedOnTop) {
    if (bottomRectFitsOnBottom) {
      return {
        position,
        rect: bottomRect
      }
    }

    if (topRectFitsOnTop) {
      return {
        position: flipHorizontal(position),
        rect: topRect
      }
    }
  }

  // Default to most spacious if there is no fit.
  const spaceBottom = Math.abs(
    viewport.height - viewportOffset - bottomRect.bottom
  )

  const spaceTop = Math.abs(topRect.top - viewportOffset)

  if (spaceBottom < spaceTop) {
    return {
      position: positionIsAlignedOnTop ? flipHorizontal(position) : position,
      rect: bottomRect
    }
  }

  return {
    position: positionIsAlignedOnTop ? position : flipHorizontal(position),
    rect: topRect
  }
}

/**
 * Function that takes in numbers and position and gives the final coords.
 */
function getRect({
  position,
  targetOffset,
  dimensions,
  targetRect,
  exactPosition = false
}: {
  position: string
  targetOffset: number
  dimensions: Dimensions
  targetRect: Rect
  exactPosition?: boolean
}) {
  const leftRect = targetRect.left + targetRect.width / 2 - dimensions.width / 2
  const alignedTopY = targetRect.top - dimensions.height - targetOffset
  const alignedBottomY = targetRect.bottom + targetOffset
  const alignedRightX = targetRect.right - dimensions.width
  const alignedLeftRightY =
    targetRect.top + targetRect.height / 2 - dimensions.height / 2

  const makeRectFn: typeof makeCeiledRect = exactPosition
    ? makeRect
    : makeCeiledRect

  switch (position) {
    case Position.LEFT:
      return makeRectFn(dimensions, {
        left: targetRect.left - dimensions.width - targetOffset,
        top: alignedLeftRightY
      })
    case Position.RIGHT:
      return makeRectFn(dimensions, {
        left: targetRect.right + targetOffset,
        top: alignedLeftRightY
      })
    case Position.TOP:
      return makeRectFn(dimensions, {
        left: leftRect,
        top: alignedTopY
      })
    case Position.TOP_LEFT:
      return makeRectFn(dimensions, {
        left: targetRect.left,
        top: alignedTopY
      })
    case Position.TOP_RIGHT:
      return makeRectFn(dimensions, {
        left: alignedRightX,
        top: alignedTopY
      })
    default:
    case Position.BOTTOM:
      return makeRectFn(dimensions, {
        left: leftRect,
        top: alignedBottomY
      })
    case Position.BOTTOM_LEFT:
      return makeRectFn(dimensions, {
        left: targetRect.left,
        top: alignedBottomY
      })
    case Position.BOTTOM_RIGHT:
      return makeRectFn(dimensions, {
        left: alignedRightX,
        top: alignedBottomY
      })
  }
}
