export type Colors =
  | "neutral"
  | "green"
  | "blue"
  | "red"
  | "orange"
  | "purple"
  | "yellow"
  | "teal"
  | "white"

export interface Props {
  color: Colors
  appearance: "solid" | "subtle"
}
