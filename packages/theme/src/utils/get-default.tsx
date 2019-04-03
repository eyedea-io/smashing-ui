import {DefaultTheme} from "styled-components"

export const getDefault = (
  component: string,
  prop: string,
  defaultValue: string | number,
  propValue?: string | number
): any => (_: {theme: DefaultTheme}) => {
  if (propValue !== undefined) {
    return propValue
  }

  if (
    _.theme.defaults &&
    _.theme.defaults[component] !== undefined &&
    _.theme.defaults[component][prop] !== undefined
  ) {
    return _.theme.defaults[component][prop]
  }

  return defaultValue
}
