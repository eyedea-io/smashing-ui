import * as React from 'react'
import styled, {ThemeContext} from 'styled-components'
import {useDefaults} from '@smashing/theme'
import {
  AvatarAppearanceType,
  AvatarProps,
  InitialsProps,
  BoxProps,
  AvatarStackProps
} from './types'
import {
  getInitials,
  getAvatarInitialsFontSize,
  getAvatarProps,
  hashCode
} from './utils'
import {Text} from '@smashing/typography'
import {ColorProperty} from 'csstype'

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

const AvatarContext = React.createContext({size: 32})

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (componentProps, ref) => {
    const {
      children,
      name,
      src,
      hashValue,
      count,
      className,
      ...props
    } = componentProps
    const theme = React.useContext(ThemeContext)
    const {size} = React.useContext(AvatarContext)
    const defaults = useDefaults('avatar', props, {
      appearance: 'subtle' as AvatarAppearanceType,
      color: 'automatic' as Exclude<AvatarProps['color'], undefined>,
      size,
      sizeLimitOneCharacter: 20,
      forceShowInitials: false
    })

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
        ref={ref}
        className={className}
        {...props}
      >
        {count !== undefined ? (
          <Initials
            fontSize={initialsFontSize}
            lineHeight={initialsFontSize}
            size={defaults.size}
            textColor={colorProps.color as any}
          >
            +{count}
          </Initials>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </Box>
    )
  }
)

const More = styled(Avatar)``

const Stack = styled.div<{borderColor: ColorProperty; hasBorder: boolean}>`
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
  position: relative;

  > * {
    margin-right: -0.5rem;
    order: 2;
    z-index: 1;
    ${_ => _.hasBorder && `border: 2px solid ${_.borderColor};`}
  }

  > ${More} {
    order: 0;
    z-index: 0;
  }
`

const AvatarStack: React.FC<AvatarStackProps> = ({
  children,
  limit,
  ...props
}) => {
  const defaults = useDefaults('avatarStack', props, {
    size: 32,
    showMore: true,
    borderColor: '#fff',
    hasBorder: true
  })

  return (
    <AvatarContext.Provider value={{size: defaults.size}}>
      <Stack
        borderColor={defaults.borderColor}
        hasBorder={defaults.hasBorder}
        {...props}
      >
        {React.Children.toArray(children)
          .slice(0, limit)
          .map(child => child)}
        {typeof limit === 'number' &&
          defaults.showMore &&
          React.Children.count(children) > limit && (
            <More count={React.Children.count(children) - limit} />
          )}
      </Stack>
    </AvatarContext.Provider>
  )
}

export {
  Avatar,
  AvatarStack,
  AvatarStackProps,
  AvatarProps,
  AvatarAppearanceType
}

declare module 'styled-components' {
  export interface SmashingAvatarDefaults
    extends Partial<{
      avatar: Pick<AvatarProps, 'appearance' | 'size' | 'sizeLimitOneCharacter'>
      avatarStack: Pick<
        AvatarStackProps,
        'showMore' | 'borderColor' | 'size' | 'hasBorder'
      >
    }> {}
}
