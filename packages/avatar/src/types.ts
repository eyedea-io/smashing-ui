import {ColorProperty} from 'csstype'
import {RefObject} from 'react'

export declare type AvatarAppearanceType = 'subtle' | 'solid'
export interface AvatarProps {
  /**
   * The look of avatar.
   */
  appearance?: AvatarAppearanceType

  /**
   * The name used for the initials and title attribute.
   */
  name?: string

  /**
   * The size of the avatar.
   */
  size?: number

  /**
   * The src attribute of the image.
   * When it's not available, render initials instead.
   */
  src?: string

  /**
   * The color used for the avatar.
   * When the value is `automatic`, use the hash function to determine the color.
   */
  color?:
    | 'neutral'
    | 'automatic'
    | 'blue'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'purple'

  /**
   * The value used for the hash function.
   * The name is used as the hashValue by default.
   * When dealing with anonymous users you should use the id instead.
   */
  hashValue?: string

  /**
   * When the size is smaller than this number, use a single initial for the avatar.
   */
  sizeLimitOneCharacter?: number

  /**
   * Used in AvatarStack to show number of not displayed avatars.
   */
  count?: number

  /**
   * Ref of the element being positioned.
   */
  innerRef?: RefObject<HTMLDivElement>
}

export interface AvatarStackProps {
  limit?: number
  showMore?: boolean
  borderColor?: ColorProperty
  size?: number
  withoutBorder?: boolean
}

export type InitialsProps = {
  fontSize: string
  lineHeight: string
  textColor: string
  size: number
}

export type BoxProps = {
  size: number
  backgroundColor: string
}

declare module 'styled-components' {
  export interface SmashingAvatarDefaults
    extends Partial<{
      avatar?: {
        appearance?: AvatarAppearanceType
        size: number
        sizeLimitOneCharacter: number
        forceShowInitials: boolean
      }
    }> {}
}
