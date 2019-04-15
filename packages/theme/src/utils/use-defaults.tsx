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

  return deepmerge(componentDefaults, deepmerge(defaults, props))
}
