export type BadgeAppearances = 'subtle' | 'solid'

export type BadgeColors =
  | 'neutral'
  | 'green'
  | 'blue'
  | 'red'
  | 'orange'
  | 'purple'
  | 'yellow'
  | 'teal'
  | 'white'

export interface Props {
  color: BadgeColors
  appearance: 'solid' | 'subtle'
}
