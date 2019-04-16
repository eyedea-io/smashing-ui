import {DefaultTheme} from "styled-components"
import {IntentType} from "./types"
import * as React from "react"

export const getAlertIconForIntent = (intent?: IntentType) => (_: {
  theme: DefaultTheme
}) => {
  switch (intent) {
    case "success":
      return (
        <svg viewBox="0 0 16 16" style={{fill: "rgb(71, 184, 129)"}}>
          <path
            d="M8 16c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm4-11c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0 0 12 5z"
            fill-rule="evenodd"
          />
        </svg>
      )
    case "warning":
      return (
        <svg viewBox="0 0 16 16" style={{fill: "rgb(217, 130, 43)"}}>
          <path
            d="M15.84 13.5l.01-.01-7-12-.01.01c-.17-.3-.48-.5-.85-.5s-.67.2-.85.5l-.01-.01-7 12 .01.01c-.09.15-.15.31-.15.5 0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-.19-.06-.35-.15-.5zm-6.85-.51h-2v-2h2v2zm0-3h-2v-5h2v5z"
            fill-rule="evenodd"
          />
        </svg>
      )
    case "danger":
      return (
        <svg viewBox="0 0 16 16" style={{fill: "rgb(236, 76, 71)"}}>
          <path
            d="M7.99-.01c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13h-2v-2h2v2zm0-3h-2v-7h2v7z"
            fill-rule="evenodd"
          />
        </svg>
      )
    case "info":
    default:
      return (
        <svg viewBox="0 0 16 16" style={{fill: "rgb(16, 112, 202)"}}>
          <path
            d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM7 3h2v2H7V3zm3 10H6v-1h1V7H6V6h3v6h1v1z"
            fill-rule="evenodd"
          />
        </svg>
      )
  }
}

export const getTrimColorByIntent = (intent?: IntentType) => (_: {
  theme: DefaultTheme
}) => {
  const {colors} = _.theme

  switch (intent) {
    case "success":
      return colors.intent.success
    case "warning":
      return colors.intent.warning
    case "danger":
      return colors.intent.danger
    case "info":
    default:
      return colors.intent.none
  }
}
