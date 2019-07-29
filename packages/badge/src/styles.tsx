import {Strong, StrongProps} from "@smashing/typography"
import styled, {css} from "styled-components/macro"
import {Colors} from "./types"

interface StyledBadgeProps
  extends Pick<StrongProps, Exclude<keyof StrongProps, "color">> {
  color: any
  backgroundColor: Colors
  appearance: "solid" | "subtle"
}

export const StyledBadge = styled(Strong)<StyledBadgeProps>`
  ${({appearance, backgroundColor}) =>
    appearance === "subtle"
      ? css`
          background: ${_ => _.theme.palette[backgroundColor].light};
        `
      : css`
          background: ${_ => _.theme.palette[backgroundColor].base};
        `}
`
