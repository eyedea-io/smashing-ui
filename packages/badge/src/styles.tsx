import {DefaultTheme} from "styled-components/macro"

export const getBadgeProps = (
  _: DefaultTheme,
  {color, isSolid}: {color: string; isSolid: boolean}
): {
  color: string
  backgroundColor: {
    type: "lightest" | "light" | "base" | "dark"
    color: string
  }
} => {
  if (isSolid) {
    return {
      backgroundColor: {color, type: "base"},
      color: _.colors.background.white
    }
  }

  return {
    backgroundColor: {color, type: "light"},
    color: color
  }
}
