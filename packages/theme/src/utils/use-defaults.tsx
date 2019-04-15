import {useContext} from "react"
import {ThemeContext} from "styled-components"
import get from "get-value"
import deepmerge from "deepmerge"

export function useDefaults<P>(
  component: string,
  props: any,
  componentDefaults: P
): P {
  const theme = useContext(ThemeContext)
  const defaults = get(theme.defaults, component, {default: {}})
  const merged: P = deepmerge(defaults, props)

  Object.keys(merged).forEach(key => {
    if (merged[key] === undefined) {
      if (defaults[key]) {
        merged[key] = defaults[key]
      } else {
        delete merged[key]
      }
    }
  })

  return deepmerge(componentDefaults, merged)
}
