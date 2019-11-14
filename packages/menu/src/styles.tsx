import styled from 'styled-components'
import {Text as PureText, Heading as PureHeading} from '@smashing/typography'

interface ItemProps {
  height: number
}

export const Text = styled(PureText)`
  flex: 1;
  margin-left: ${_ => _.theme.spacing.xxs};
  margin-right: ${_ => _.theme.spacing.xxs};
  padding-left: ${_ => _.theme.spacing.xxs};
  padding-right: ${_ => _.theme.spacing.xxs};
`
export const Item = styled.div<ItemProps>`
  height: ${_ => _.height}px;
  display: flex;
  align-items: center;

  &[data-isselectable='true'] {
    cursor: pointer;
  }

  &[data-isselectable='false'] {
    cursor: default;
    ${Text} {
      color: ${_ => _.theme.colors.text.muted};
    }
  }

  &:not([data-isselectable='false']):hover {
    background-color: ${_ => _.theme.scales.neutral.N1A};
  }

  &:focus {
    outline: none;
  }

  &:not([data-isselectable='false']):focus {
    background-color: ${_ => _.theme.scales.blue.B1A};
  }

  &:not([data-isselectable='false']):active {
    background-color: ${_ => _.theme.scales.blue.B2A};
  }

  &[aria-checked='true'] {
    background-image: none;
    background-color: ${_ => _.theme.scales.blue.B3A};
  }

  &[aria-checked='true'][data-isselectable='true'] ${PureText} {
    color: ${_ => _.theme.colors.text.intense};
  }
`
export const SecondaryText = styled(Text)`
  margin-right: ${_ => _.theme.spacing.sm};
`
interface GroupProps {
  separated?: boolean
  invalid?: boolean
}
export const Group = styled.div<GroupProps>`
  padding-top: ${_ => _.theme.spacing.xxs};
  padding-bottom: ${_ => _.theme.spacing.xxs};

  ${_ =>
    _.separated && {
      '&:hover': {
        [`${Item}:not([data-isselectable=\'false\'])`]: {
          [Text]: {
            color: _.invalid
              ? _.theme.colors.text.danger
              : _.theme.colors.text.muted,
            '&:hover': {
              color: _.invalid
                ? _.theme.colors.text.danger
                : _.theme.colors.text.default,
              boxShadow: 'inset 0 -2px 0 0 currentColor'
            }
          }
        }
      },
      [Text]: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        color: _.invalid
          ? _.theme.colors.text.danger
          : _.theme.colors.text.intense
      },
      [Item]: {
        boxShadow: `inset 0 1px 0 0 ${
          _.invalid ? _.theme.colors.border.danger : _.theme.colors.border.muted
        }`,
        '&:not([data-isselectable=\'false\']):hover': {
          backgroundColor: 'unset'
        }
      }
    }}
`
export const GroupHeading = styled(PureHeading)`
  margin-top: ${_ => _.theme.spacing.xxs};
  margin-bottom: ${_ => _.theme.spacing.xxs};
  margin-left: ${_ => _.theme.spacing.sm};
  margin-right: ${_ => _.theme.spacing.sm};
`
export const Divider = styled.div`
  border-bottom: 1px solid ${_ => _.theme.colors.border.default};
`
export const CheckIcon = styled.svg`
  margin-left: ${_ => _.theme.spacing.sm};
  fill: ${_ => _.theme.colors.icon.selected};

  & + ${Text} {
    margin-left: ${_ => _.theme.spacing.xxxs};
  }

  [data-isselectable='false'] & {
    fill: ${_ => _.theme.colors.icon.disabled};
  }
`
export const CheckIconPlaceholder = styled.div`
  margin-left: ${_ => _.theme.spacing.sm};
  width: 12px;

  & + ${Text} {
    margin-left: ${_ => _.theme.spacing.xxxs};
  }
`
