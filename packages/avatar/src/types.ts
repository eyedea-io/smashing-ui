export declare type AppearanceType = "subtle" | "solid"
export interface AvatarProps {
  /**
   * The look of avatar.
   */
  appearance?: AppearanceType

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
    | "neutral"
    | "automatic"
    | "blue"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "purple"

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
}

declare module "styled-components" {
  export interface SmashingAvatarDefaults
    extends Partial<{
      avatar?: {
        appearance?: AppearanceType
        size: number
        sizeLimitOneCharacter: number
        forceShowInitials: boolean
      }
    }> {}
}