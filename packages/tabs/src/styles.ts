import styled, {DefaultTheme} from 'styled-components'
import {TabProps, TabListProps, TabsAppearanceType} from './types'

export const TabList = styled.ul<TabListProps>`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 100%;
  ${_ => getTabListStyle(_.appearance)}
`

export const Tab = styled.li<TabProps>`
  padding: ${_ => _.theme.spacing.sm};
  position: relative;
  cursor: pointer;

  strong {
    color: ${_ => (_.invalid ? _.theme.colors.text.danger : !_.isSelected && _.theme.colors.text.muted)};
  }

  &:hover > * {
    color: ${_ => (_.invalid ? _.theme.colors.text.danger : _.theme.colors.text.selected)};
  }
  ${_ => getTabStyle(_.appearance, _.isSelected, _.invalid)}
`

const getTabListStyle = (appearance?: TabsAppearanceType) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'flat':
      return {}
    case 'default':
    default:
      return {
        ..._.theme.elevation.dropdown
      }
  }
}

const getTabStyle = (appearance?: TabsAppearanceType, isSelected?: boolean, invalid?: boolean) => (_: {
  theme: DefaultTheme
}) => {
  switch (appearance) {
    case 'flat':
      return {}
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
          background: invalid ? _.theme.colors.text.danger : _.theme.colors.text.default
        }
      }
  }
}
