import styled, {css} from "styled-components/macro"
import * as React from "react"

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

export const ArrowIcon = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.70711 4.70711C7.31658 5.09763 6.68342 5.09763 6.29289 4.70711L4 2.41421L1.70711 4.70711C1.31658 5.09763 0.683417 5.09763 0.292893 4.70711C-0.0976314 4.31658 -0.0976313 3.68342 0.292894 3.29289L3.29289 0.292893C3.48043 0.105356 3.73478 -3.72877e-07 4 -3.49691e-07C4.26522 -3.26505e-07 4.51957 0.105356 4.70711 0.292893L7.70711 3.29289C8.09763 3.68342 8.09763 4.31658 7.70711 4.70711Z"
      fill="#1D304E"
    />
  </svg>
)

export const S = {
  SelectButton: styled.button<{isOpen: boolean}>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 5px;
    ${_ =>
      _.isOpen && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }}
    background: white;
    width: 200px;
    border: 0;
    outline: none;
    padding: 16px;
    text-align: left;
    box-shadow: rgba(67, 90, 111, 0.3) 0px 0px 1px,
      rgba(67, 90, 111, 0.47) 0px 5px 8px -4px;
  `,
  SelectList: styled.ul`
    padding: 0;
    margin: 0;
  `,
  SelectListItem: styled.li<{isActive: boolean}>`
    list-style: none;
    padding: 16px;
    background-color: ${_ =>
      _.isActive
        ? _.theme.colors.background.blueTint
        : _.theme.colors.background.white};
  `,
  RotateAnimation: styled.div<{isOpen: boolean}>`
    transition: 0.5s;
    transform: rotate(180deg);
    ${_ =>
      _.isOpen &&
      css`
        transform: rotate(0deg);
      `}
  `
}
