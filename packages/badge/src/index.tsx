import * as React from "react"
import {ThemeContext} from "styled-components/macro"
import {useDefaults} from "@smashing/theme"
import {BadgeProps} from "./types"
import {Strong} from "@smashing/typography"
import {getBadgeProps} from "./styles"

const Badge: React.FC<BadgeProps> = ({children, ...props}) => {
  const {color: propsColor, isSolid, ...defaults} = useDefaults(
    "badge",
    props,
    {
      color: "blue",
      isSolid: false
    }
  )

  const theme = React.useContext(ThemeContext)
  const {color, backgroundColor} = getBadgeProps(theme, {
    color: propsColor,
    isSolid
  })

  const style = {
    padding: "2px 6px",
    borderRadius: "2px"
  }

  return (
    <Strong
      variant={300}
      color={color}
      backgroundColor={backgroundColor}
      style={{...style, ...defaults}}
    >
      {children}
    </Strong>
  )
}

export {Badge, BadgeProps}

declare module "styled-components" {
  export interface SmashingAlertDefaults
    extends Partial<{
      badge?: {
        color: string
        isSolid: boolean
      }
    }> {}
}
