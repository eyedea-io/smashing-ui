import styled from "styled-components/macro"
import * as React from "react"
import {Button} from "@smashing/button"

export const CheckIcon = () => (
  <svg
    width="12"
    height="9"
    viewBox="0 0 12 9"
    fill="none"
    style={{paddingRight: "8px"}}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L4.70711 8.70711C4.51957 8.89464 4.26522 9 4 9C3.73478 9 3.48043 8.89464 3.29289 8.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31658 3.90237 1.70711 4.29289L4 6.58579L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893Z"
      fill="#1D304E"
    />
  </svg>
)

export const S = {
  SelectList: styled.ul`
    padding: 0;
    margin: 0;
  `,
  StyledButton: styled(Button)`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  SelectListItem: styled.li<{isActive: boolean}>`
    list-style: none;
    padding: 16px ${_ => (_.isActive ? "12px" : "32px")};
    background-color: ${_ =>
      _.isActive
        ? _.theme.colors.background.blueTint
        : _.theme.colors.background.white};
  `
}
