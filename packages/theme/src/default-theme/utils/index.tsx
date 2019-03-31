import {DefaultTheme} from "styled-components"
import {theme} from "../.."

export interface WithTheme {
  theme: DefaultTheme
}

export const themedProperty = (object: any, keyOrValue: string | number) => {
  if (Object.prototype.hasOwnProperty.call(object, keyOrValue)) {
    return object[keyOrValue]
  }

  return keyOrValue
}

export const ensureTheme = (cb: (config: DefaultTheme) => any) => (
  props: WithTheme
) => {
  return cb(Object.is(props.theme, {}) ? props.theme : theme)
}
