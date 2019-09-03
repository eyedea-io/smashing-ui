import {useContext} from 'react'
import {ThemeContext} from 'styled-components'
import * as deepmerge from 'deepmerge'
import {getValue} from './get-value'

const overwriteMerge = (_destinationArray: any, sourceArray: any) => sourceArray

export function useDefaults<P>(
  component: string,
  props: any,
  componentDefaults: P
): P {
  const theme = useContext(ThemeContext)
  const defaults = getValue(theme.defaults, component, {default: {}})
  const merged: P = deepmerge(defaults, props, {arrayMerge: overwriteMerge})
  Object.keys(merged).forEach(key => {
    if (merged[key] === undefined) {
      if (defaults[key]) {
        merged[key] = defaults[key]
      } else {
        delete merged[key]
      }
    }
  })

  return deepmerge(componentDefaults, merged, {arrayMerge: overwriteMerge})
}
