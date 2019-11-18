import styled, {DefaultTheme} from 'styled-components'
import {TabProps, TabListProps, TabsAppearanceType} from './types'

export const TabList = styled.ul<
  TabListProps & {visibleItemsCount?: number; isOpen?: boolean}
>`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: ${_ => (_.isOpen ? 'column' : 'row')};
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 100%;
  ${_ => getTabListStyle(_.appearance, _.isOpen, _.disabled, _.invalid)}
  ${_ => {
    const elemLiStyle = {}
    if (!_.isOpen && _.visibleItemsCount) {
      elemLiStyle[
        `> li:nth-child(n + ${_.visibleItemsCount}):not(:nth-last-child(1))`
      ] = {
        display: 'none'
      }
    }

    if (_.isOpen) {
      elemLiStyle['li:first-child'] = {
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit'
      }
      elemLiStyle['li:last-child'] = {
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit'
      }
    } else {
      elemLiStyle['li:first-child'] = {
        borderTopLeftRadius: 'inherit',
        borderBottomLeftRadius: 'inherit'
      }
      elemLiStyle['li:last-child'] = {
        borderTopRightRadius: 'inherit',
        borderBottomRightRadius: 'inherit'
      }
    }

    return elemLiStyle
  }}
`

export const Tab = styled.li<TabProps>`
  padding: ${_ => _.theme.spacing.sm};
  position: relative;
  cursor: pointer;

  strong {
    color: ${_ =>
      _.invalid
        ? _.theme.colors.text.danger
        : !_.isSelected && _.theme.colors.text.muted};
  }

  svg path {
    fill: currentColor;
  }

  &:hover > * {
    color: ${_ =>
      _.invalid ? _.theme.colors.text.danger : _.theme.colors.text.selected};
  }
  ${_ => getTabStyle(_.appearance, _.isSelected, _.invalid)}
`

export const MoreButton = styled.button<{isOpen: boolean}>`
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  width: inherit;
  height: 45px;
  top: 0;
  right: 0;
  svg {
    transform: ${_ => (_.isOpen ? 'rotateX(180deg)' : '')};
  }
  :focus {
    outline: none;
  }
`

export const MoreButtonContainer = styled.li<{
  isOpen?: boolean
  invalid?: boolean
}>`
  ${_ => _.isOpen && {border: 'none'}}
  width: 50px;
`

const getTabListStyle = (
  appearance?: TabsAppearanceType,
  isOpen?: boolean,
  disabled?: boolean,
  invalid?: boolean
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'flat':
      return {}
    case 'outline':
      const disabledStyle = {
        [Tab]: {
          cursor: disabled ? 'not-allowed' : 'pointer',
          '&:hover strong, strong': {
            color: _.theme.colors.text.muted
          },
          '&:hover:after': {
            content: 'none'
          },
          '&:after': {
            backgroundColor: _.theme.colors.text.muted
          }
        },
        [MoreButton]: {
          cursor: 'not-allowed'
        }
      }

      const notDisabledStyle = {
        '&:hover': {
          borderColor: invalid
            ? _.theme.colors.border.danger
            : _.theme.colors.border.active,
          [`${Tab}:not(:hover)`]: {
            '&:after': {
              content: 'none'
            },
            strong: {
              color: invalid
                ? _.theme.colors.text.danger
                : _.theme.colors.text.muted
            }
          }
        }
      }

      let borderColor = _.theme.colors.border.default
      if (disabled) {
        borderColor = _.theme.colors.border.muted
      } else if (isOpen) {
        borderColor = _.theme.colors.border.active
      }
      if (invalid) {
        borderColor = _.theme.colors.border.danger
      }

      return {
        border: `1px solid ${borderColor}`,
        ...(disabled ? disabledStyle : notDisabledStyle),
        strong: {
          transition: 'color 0.25s ease',
          color: _.theme.colors.text.default
        },
        borderRadius: _.theme.radius,
        justifyContent: 'space-between',
        'li:not(:last-child)': {
          borderRight: isOpen
            ? 'none'
            : `1px solid ${
                invalid
                  ? _.theme.colors.border.danger
                  : _.theme.colors.border.muted
              }`
        },
        'li:not(:nth-last-child(-n + 2))': {
          borderBottom: isOpen
            ? `1px solid ${
                invalid
                  ? _.theme.colors.border.danger
                  : _.theme.colors.border.default
              }`
            : 'none'
        }
      }
    case 'default':
    default:
      return {
        ..._.theme.elevation.dropdown
      }
  }
}

const getTabStyle = (
  appearance?: TabsAppearanceType,
  isSelected?: boolean,
  invalid?: boolean
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'flat':
      return {}
    case 'outline':
      return {
        padding: _.theme.spacing.xs,
        whiteSpace: 'nowrap' as 'nowrap',
        flex: 1,
        textAlign: 'center' as 'center',
        position: 'relative' as 'relative',
        '&:after': {
          content: isSelected ? '""' : 'none',
          position: 'absolute' as 'absolute',
          left: _.theme.spacing.xxs,
          right: _.theme.spacing.xxs,
          bottom: 0,
          height: '2px',
          backgroundColor: invalid
            ? _.theme.colors.text.danger
            : _.theme.colors.text.intense
        },
        '&:hover': {
          strong: {
            color: !invalid ? _.theme.colors.text.intense : undefined
          },
          '&:after': {
            content: '""'
          }
        }
      }
    case 'default':
    default:
      return {
        '&::after': {
          content: isSelected ? '""' : '',
          height: '4px',
          display: 'block',
          position: 'absolute' as 'absolute',
          bottom: 0,
          left: _.theme.spacing.xs,
          right: _.theme.spacing.xs,
          borderRadius: '2px 2px 0 0',
          background: _.theme.colors.text.default
        }
      }
  }
}
