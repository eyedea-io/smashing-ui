import styled, {css} from 'styled-components'
import {
  SelectMenuAppearanceType,
  SelectMenuPopoverAppearanceType
} from './types'
import {TextInput} from '@smashing/text-input'
import {MenuElements} from '@smashing/menu'
import {Button as PureButton} from '@smashing/button'
import {Popover as PopoverElement} from '@smashing/popover'
import {Heading} from '@smashing/typography'

interface PopoverProps {
  buttonAppearance?: SelectMenuAppearanceType
  appearance?: SelectMenuPopoverAppearanceType
  invalid?: boolean
}
interface ButtonProps {
  popoverAppearance?: SelectMenuPopoverAppearanceType
}
interface MenuContainerProps {
  appearance?: SelectMenuAppearanceType
  height?: number
}

export const Popover = styled(PopoverElement)<PopoverProps>`
  ${MenuElements.Group} {
    padding: 0;
  }

  ${_ => {
    let borderColor = _.theme.colors.border[_.invalid ? 'invalid' : 'active']

    if (_.buttonAppearance === 'outline') {
      borderColor =
        _.theme.colors.button.outline.borderColor[
          _.invalid ? 'invalid' : 'active'
        ]
    }

    return (
      _.appearance === 'accordion' &&
      css`
        box-sizing: border-box;
        border-radius: 0px;
        border-bottom-left-radius: ${_.theme.radius};
        border-bottom-right-radius: ${_.theme.radius};
        box-shadow: ${`inset 0 0 0 1px ${borderColor}`};
        padding: 0 1px;
        background-color: ${_.theme.colors.background.default};
      `
    )
  }}
`
export const Title = styled(Heading)`
  margin: 0;
`
export const Button = styled(PureButton)<ButtonProps>`
  &[aria-expanded='true'] {
    ${_ =>
      _.popoverAppearance === 'accordion' && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }}
  }
`
export const FilterInput = styled(TextInput)`
  box-shadow: none;
  background-color: ${_ => _.theme.colors.background.tint1};
  border-bottom: 1px solid ${_ => `${_.theme.colors.border.default}`};
  width: 100%;

  &::placeholder {
    color: ${_ => _.theme.colors.text.muted};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`
export const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${_ => `1px solid ${_.theme.colors.border.default}`};
  padding-right: ${_ => _.theme.spacing.xxs};
  padding-left: ${_ => _.theme.spacing.sm};
  min-height: 40px;
  box-sizing: border-box;
`
export const MenuContainer = styled.div<MenuContainerProps>`
  overflow-y: auto;
  height: 100%;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`
export const CloseButton = styled(PureButton)`
  padding-left: 6px;
  padding-right: 6px;
  svg {
    fill: ${_ => _.theme.colors.icon.default};
    width: 12px;
    height: 12px;
  }
`
export const EmptyView = styled.div`
  margin: ${_ => _.theme.spacing.xs} 0;
  display: flex;
  justify-content: center;
  text-align: center;
`
