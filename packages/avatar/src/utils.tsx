import {DefaultTheme} from "styled-components"
import {AvatarProps} from "."

export function hashCode(s: any) {
  const str = String(s)
  let hash = 0
  let char: number

  if (str.trim().length === 0) return hash

  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    // Convert to 32bit integer
    hash &= hash
  }

  return Math.abs(hash)
}

export function getInitials(name?: string, fallback = "?") {
  if (!name || typeof name !== "string") return fallback

  return name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map(v => v && v[0].toUpperCase())
    .join("")
}

export function getAvatarInitialsFontSize(
  size: number,
  sizeLimitOneCharacter: number
) {
  if (size <= sizeLimitOneCharacter) {
    return Math.ceil(size / 2.2)
  }

  return Math.ceil(size / 2.6)
}

export const getAvatarProps = ({
  theme,
  appearance,
  color,
  hashValue
}: {
  theme: DefaultTheme
  appearance: "solid" | "subtle"
  color: Exclude<AvatarProps["color"], undefined>
  hashValue: number
}): {
  color: string
  backgroundColor: string
} => {
  const appearances = theme.fills[appearance]

  if (color === "automatic") {
    const keys = Object.keys(appearances)
    const key = keys[hashValue % keys.length]
    return appearances[key]
  }

  return appearances[color]
}
