export type transitionType = 'scale' | 'expand'

const transitionScaleStyles = {
  entering: {
    opacity: 1,
    visibility: 'visible',
    transform: 'scale(1)'
  },

  entered: {
    opacity: 1,
    visibility: 'visible',
    transform: 'scale(1)'
  },
  exiting: {opacity: 0, transform: 'scale(1)'},
  exited: {
    opacity: 0,
    visibility: 'hidden',
    transform: 'scale(.8)'
  }
}

const transitionExpandStyles = {
  entering: {
    opacity: 1,
    visibility: 'visible',
    transform: 'scaleY(1)',
    transformOrigin: 'center top'
  },

  entered: {
    opacity: 1,
    visibility: 'visible',
    transform: 'scaleY(1)',
    transformOrigin: 'center top'
  },
  exiting: {transform: 'scaleY(0)', transformOrigin: 'left top'},
  exited: {transform: 'scaleY(0)', transformOrigin: 'left top'}
}

export const getTransition = (transitionType?: transitionType) => {
  if (transitionType === 'expand') {
    return transitionExpandStyles
  }

  return transitionScaleStyles
}
