import * as React from "react"
import styled, {ThemeContext} from "styled-components"
import {useDefaults} from "@smashing/theme"
import {AppearanceType, AvatarProps} from "./types"
import {
  getInitials,
  getAvatarInitialsFontSize,
  getAvatarProps,
  hashCode
} from "./utils"
import {Text} from "@smashing/typography"

interface BoxProps {
  size: number
  backgroundColor: string
}

const Box = styled.div.attrs({})<BoxProps>`
  overflow: hidden;
  border-radius: 100em;
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  width: ${_ => _.size}px;
  height: ${_ => _.size}px;
  background-color: ${_ => _.backgroundColor};
`

interface InitialsProps {
  fontSize: string
  lineHeight: string
  textColor: string
  size: number
}

const Initials = styled(Text).attrs({})<InitialsProps>`
  top: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${_ => _.textColor};
  width: ${_ => _.size}px;
  height: ${_ => _.size}px;
  line-height: ${_ => _.fontSize};
  font-size: ${_ => _.lineHeight};
`

const Image = styled.img`
  width: auto;
  height: 100%;
`

const Avatar: React.FC<AvatarProps> = ({
  children,
  name,
  src,
  hashValue,
  ...props
}) => {
  const defaults = useDefaults("avatar", props, {
    appearance: "subtle" as AppearanceType,
    color: "automatic" as Exclude<AvatarProps["color"], undefined>,
    size: 32,
    sizeLimitOneCharacter: 20,
    forceShowInitials: false
  })
  const theme = React.useContext(ThemeContext)

  const [imageHasFailedLoading, setImageHasFailedLoading] = React.useState(
    false
  )
  const handleError = React.useCallback(() => {
    setImageHasFailedLoading(true)
  }, [])
  const imageUnavailable = !src || imageHasFailedLoading
  const initialsFontSize = `${getAvatarInitialsFontSize(
    defaults.size,
    defaults.sizeLimitOneCharacter
  )}px`

  let initials = getInitials(name)
  if (defaults.size <= defaults.sizeLimitOneCharacter) {
    initials = initials.substring(0, 1)
  }

  const colorProps = getAvatarProps({
    theme,
    appearance: defaults.appearance,
    color: defaults.color,
    hashValue: hashCode(hashValue || name)
  })

  return (
    <Box
      size={defaults.size}
      title={name}
      backgroundColor={colorProps.backgroundColor}
      {...props}
    >
      {(imageUnavailable || defaults.forceShowInitials) && (
        <Initials
          fontSize={initialsFontSize}
          lineHeight={initialsFontSize}
          size={defaults.size}
          textColor={colorProps.color as any}
        >
          {initials}
        </Initials>
      )}
      {!imageUnavailable && <Image src={src} onError={handleError} />}
    </Box>
  )
}

export {Avatar, AvatarProps, AppearanceType}
