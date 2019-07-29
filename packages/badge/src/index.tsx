import * as React from "react"
import styled, { ThemeContext, css } from "styled-components/macro"
import { useDefaults } from "@smashing/theme"
import { BadgeProps } from "./types"
import { Text, Strong } from "@smashing/typography"
import { getBadgeProps } from "./styles"

const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  const { color, isInteractive, ...defaults } = useDefaults("badge", props, {
    color: 'blue',
    isInteractive: false
  })

  const theme = React.useContext(ThemeContext)
  const appearance = isInteractive ? 'interactive' : 'default'

  const { color, backgroundColor } = getBadgeProps({
    color: propsColor,
    isSolid
  })

  return (
    <Strong
      size={300}
      color={color}
      backgroundColor={backgroundColor}
      {...defaults}
      className={classNames}
    ></Strong >
  )
}

export { Badge, BadgeProps }

declare module "styled-components" {
  export interface SmashingAlertDefaults
    extends Partial<{
      badge?: {
        color: string
        isInteractive: boolean
      }
    }> { }
}

// class Badge extends PureComponent {
//   static defaultProps = {
//     color: 'neutral',
//     isInteractive: false,
//     isSolid: false
//   }

//   static styles = {
//     display: 'inline-block',
//     boxSizing: 'border-box',
//     height: 16,
//     paddingTop: 0,
//     paddingRight: 6,
//     paddingBottom: 0,
//     paddingLeft: 6,
//     borderRadius: 2,
//     textAlign: 'center',
//     textDecoration: 'none',
//     textTransform: 'uppercase'
//   }

//   render() {
//     const {
//       theme,
//       className,
//       color: propsColor,
//       isInteractive,
//       isSolid,
//       ...props
//     } = this.props

//     const { color, backgroundColor } = theme.getBadgeProps({
//       color: propsColor,
//       isSolid
//     })

//     const appearance = isInteractive ? 'interactive' : 'default'
//     const classNames = cx(className, theme.getBadgeClassName(appearance))

//     return (
//       <Strong
//         size={300}
//         {...Badge.styles}
//         color={color}
//         backgroundColor={backgroundColor}
//         {...props}
//         className={classNames}
//       />
//     )
//   }
// }

// export default withTheme(Badge)
