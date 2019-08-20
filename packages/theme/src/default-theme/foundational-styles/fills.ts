import palette from './palette'
import scales from './scales'

const solid = {
  neutral: {
    color: '#d8e0e4',
    backgroundColor: palette.neutral.base
  },
  blue: {
    color: '#002952',
    backgroundColor: palette.blue.base
  },
  red: {
    color: palette.red.darkest,
    backgroundColor: palette.red.base
  },
  orange: {
    color: 'white',
    backgroundColor: palette.orange.base
  },
  yellow: {
    color: palette.yellow.dark,
    backgroundColor: palette.yellow.base
  },
  green: {
    color: '#025a53',
    backgroundColor: palette.green.base
  },
  teal: {
    color: 'white',
    backgroundColor: palette.teal.base
  },
  purple: {
    color: 'white',
    backgroundColor: palette.purple.base
  }
}

const subtle = {
  neutral: {
    color: scales.neutral.N9,
    backgroundColor: palette.neutral.light
  },
  blue: {
    color: palette.blue.dark,
    backgroundColor: palette.blue.light
  },
  red: {
    color: palette.red.dark,
    backgroundColor: palette.red.light
  },
  orange: {
    color: palette.orange.dark,
    backgroundColor: palette.orange.light
  },
  yellow: {
    color: palette.yellow.dark,
    backgroundColor: palette.yellow.light
  },
  green: {
    color: palette.green.dark,
    backgroundColor: palette.green.light
  },
  teal: {
    color: palette.teal.dark,
    backgroundColor: palette.teal.light
  },
  purple: {
    color: palette.purple.dark,
    backgroundColor: palette.purple.light
  }
}

const minimal = {
  neutral: {
    color: palette.neutral.dark,
    backgroundColor: 'transparent'
  },
  green: {
    color: palette.green.dark,
    backgroundColor: 'transparent'
  },
  orange: {
    color: palette.orange.dark,
    backgroundColor: 'transparent'
  },
  red: {
    color: palette.red.dark,
    backgroundColor: 'transparent'
  },
  blue: {
    color: palette.blue.dark,
    backgroundColor: 'transparent'
  }
}

const fills = {solid, subtle, minimal}

export default fills
