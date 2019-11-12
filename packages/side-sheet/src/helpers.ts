import {keyframes} from 'styled-components'
import {constants} from '@smashing/theme'

const {position: Position} = constants
type Position = 'top' | 'bottom' | 'left' | 'right'

const leftIn = keyframes`
from { transform: translateX(-100%)  }
to { transform: translateX(0)  }
`
const leftOut = keyframes`
from { transform: translateX(0)  }
to { transform: translateX(-100%)  }
`
const rightIn = keyframes`
from { transform: translateX(100%)  }
to { transform: translateX(0)  }
`
const rightOut = keyframes`
from { transform: translateX(0)  }
to { transform: translateX(100%)  }
`
const topIn = keyframes`
from { transform: translateY(-100%)  }
to { transform: translateY(0)  }
`
const topOut = keyframes`
from { transform: translateY(0)  }
to { transform: translateY(-100%)  }
`
const bottomIn = keyframes`
from { transform: translateY(100%)  }
to { transform: translateY(0)  }
`
const bottomOut = keyframes`
from { transform: translateY(0)  }
to { transform: translateY(100%)  }
`

export const getAnimationIn = (position: string) => {
  switch (position) {
    case Position.LEFT:
      return leftIn
    case Position.RIGHT:
      return rightIn
    case Position.TOP:
      return topIn
    case Position.BOTTOM:
      return bottomIn
    default:
      return leftIn
  }
}

export const getAnimationOut = (position: string) => {
  switch (position) {
    case Position.LEFT:
      return leftOut
    case Position.RIGHT:
      return rightOut
    case Position.TOP:
      return topOut
    case Position.BOTTOM:
      return bottomOut
    default:
      return leftOut
  }
}

export const getTransform = (position: string) => {
  switch (position) {
    case Position.LEFT:
      return 'translateX(-100%)'
    case Position.RIGHT:
      return 'translateX(100%)'
    case Position.TOP:
      return 'translateY(-100%)'
    case Position.BOTTOM:
      return 'translateY(100%)'
    default:
      return 'translateX(-100%)'
  }
}

export const getBoxPosition = (position?: string) => {
  switch (position) {
    case Position.LEFT:
      return {
        height: '100vh',
        maxWidth: '100vw',
        position: 'absolute' as 'absolute',
        left: 0,
        right: 'auto'
      }
    case Position.RIGHT:
      return {
        height: '100vh',
        maxWidth: '100vw',
        position: 'absolute' as 'absolute',
        right: 0,
        left: 'auto'
      }
    case Position.TOP:
      return {
        width: '100vw',
        position: 'absolute' as 'absolute',
        maxHeight: '100vh',
        top: 0,
        bottom: 'auto'
      }
    case Position.BOTTOM:
      return {
        width: '100vw',
        maxHeight: '100vh',
        position: 'absolute' as 'absolute',
        bottom: 0,
        top: 'auto'
      }
    default:
      return {
        height: '100vh',
        maxWidth: '100vw',
        position: 'absolute' as 'absolute',
        left: 0,
        right: 'auto'
      }
  }
}

export const getContentSize = (position?: string) => {
  switch (position) {
    case Position.LEFT:
      return {height: '100vh'}
    case Position.RIGHT:
      return {height: '100vh'}
    case Position.TOP:
      return {width: '100vw', left: 0}
    case Position.BOTTOM:
      return {width: '100vw', left: 0}
    default:
      return {height: '100vh'}
  }
}

export const getIconPosition = (position?: string) => {
  switch (position) {
    case Position.LEFT:
      return {
        right: 0,
        marginRight: -12,
        marginTop: 12,
        transform: 'translateX(100%)'
      }
    case Position.RIGHT:
      return {
        left: 0,
        marginLeft: -12,
        marginTop: 12,
        transform: 'translateX(-100%)'
      }
    case Position.TOP:
      return {
        right: 0,
        marginRight: 12,
        top: '100%',
        marginTop: 12,
        transform: 'translateY(0)'
      }
    case Position.BOTTOM:
      return {
        right: 0,
        marginRight: 12,
        bottom: '100%',
        marginBottom: 12,
        transform: 'translateY(0)'
      }
    default:
      return {
        left: 0,
        marginLeft: -12,
        marginTop: 12,
        transform: 'translateX(-100%)'
      }
  }
}

export const getWidthType = (width: number | string | undefined) => {
  return typeof width === 'number' ? `${width}px` : `${width}`
}
