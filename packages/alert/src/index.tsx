import * as React from "react"
import styled, {ThemeContext, css} from "styled-components"
import {useDefaults} from "@smashing/theme"
import {IntentType, AppearanceType, AlertProps} from "./types"
import {Text, Strong, Heading} from "@smashing/typography"
import {getAlertIconForIntent, getTrimColorByIntent} from "./styles"

interface BoxProps {
  hasTrim: boolean
  intent: IntentType
  appearance: AppearanceType
}

const Box = styled.div.attrs({})<BoxProps>`
  display: flex;
  position: relative;

  ${_ =>
    _.appearance === "card" &&
    css`
      border-radius: 3px;
      box-shadow: 0 0 0 1px ${_.theme.scales.neutral.N5A},
        0px 2px 4px -2px ${_.theme.scales.neutral.N6A};
    `}

  ${_ =>
    _.appearance === "default" &&
    css`
      box-shadow: inset 0 0 0 1px ${_ => _.theme.scales.neutral.N4A};
    `}

  ${_ =>
    ["card", "default"].includes(_.appearance) &&
    css`
      background-color: #fff;
      padding: 12px 16px;

      ::before {
        content: ${_.hasTrim ? '""' : "none"};
        width: 3px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${getTrimColorByIntent(_.intent)};
      }
    `}
`

const Title = styled(Strong)`
  display: block;
  margin: 0;
`

const Icon = styled.div`
  margin-top: 3px;
  margin-left: 2px;
  margin-right: 10px;

  svg {
    display: block;
    height: 14px;
  }
`

const Alert: React.FC<AlertProps> = ({children, title, ...props}) => {
  const defaults = useDefaults("alert", props, {
    hasTrim: true,
    hasIcon: true,
    intent: "info" as IntentType,
    appearance: "default" as AppearanceType
  })
  const theme = React.useContext(ThemeContext)

  return (
    <Box
      appearance={defaults.appearance}
      intent={defaults.intent}
      hasTrim={defaults.hasTrim}
    >
      {defaults.hasIcon && (
        <Icon>{getAlertIconForIntent(defaults.intent)({theme})}</Icon>
      )}
      <div>
        {typeof title === "string" ? (
          <Title as="h4" color={"dark"}>
            {title}
          </Title>
        ) : (
          title
        )}
        {typeof children === "string" ? <Text>{children}</Text> : children}
      </div>
    </Box>
  )
}

export {Alert, AlertProps, AppearanceType}

declare module "styled-components" {
  export interface SmashingAlertDefaults
    extends Partial<{
      alert?: {
        intent?: IntentType
        appearance?: AppearanceType
        hasTrim: boolean
        hasIcon: boolean
      }
    }> {}
}
