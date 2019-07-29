import * as React from "react"
import {ThemeContext} from "styled-components/macro"
import {useDefaults} from "@smashing/theme"
import {BadgeProps, Colors} from "./types"
import {StyledBadge} from "./styles"

const Badge: React.FC<BadgeProps> = ({children, ...props}) => {
  const {color, appearance, ...defaults} = useDefaults<BadgeProps>(
    "badge",
    props,
    {
      color: "blue",
      appearance: "subtle"
    }
  )

  const theme = React.useContext(ThemeContext)

  const style = {
    padding: "2px 6px",
    borderRadius: "2px"
  }

  return (
    <StyledBadge
      variant={300}
      color={appearance === "subtle" ? color : "white"}
      backgroundColor={color}
      appearance={appearance}
      style={{...style, ...defaults}}
    >
      {children}
    </StyledBadge>
  )
}

export {Badge, BadgeProps}

declare module "styled-components" {
  export interface SmashingBadgeDefaults
    extends Partial<{
      badge?: {
        color: Colors
        appearance: "solid" | "subtle"
      }
    }> {}
}
