import styled, {DefaultTheme} from 'styled-components'
import {ButtonIntentType, ButtonAs} from '@smashing/button'
import {TextInputProps, TextInput} from '@smashing/text-input'
import {SelectProps, SelectAppearanceType} from './types'

type StyledSelectProps = Pick<SelectProps, 'appearance' | 'intent' | 'full'>

const getSelectTextStyle = (
  appearance?: SelectAppearanceType,
  intent: ButtonIntentType = 'none'
) => (_: {theme: DefaultTheme}) => {
  const {colors} = _.theme
  switch (appearance) {
    case 'primary':
      return {
        color: 'white'
      }
    case 'flat':
    case 'minimal':
    case 'subtle':
      const theme =
        colors.button[appearance][intent] || colors.button[appearance].info
      return {
        color: theme.color
      }
    case 'default':
    default:
      return {
        color: colors.text[intent]
      }
  }
}

export const S = {
  SelectWrapper: styled.div<StyledSelectProps>`
    position: relative;

    ${_ =>
      _.full
        ? {
            display: 'inline-block',
            width: '100%'
          }
        : {
            display: 'inline-flex'
          }}

    &::before,
    &::after {
      position: absolute;
      pointer-events: none;
      top: 50%;
      right: 8px;
      font-size: 6px;
      ${_ => getSelectTextStyle(_.appearance, _.intent)};
    }

    /* TODO: add icon to outline selects according to design */
    &::before {
      content: '\u25B2';
      transform: translate(0, -100%);
    }
    &::after {
      content: '\u25BC';
    }
  `,
  ButtonAsSelectComponent: styled<React.FC<SelectProps>>(
    ButtonAs<HTMLSelectElement>('select')
  )`
    -webkit-appearance: button;
    padding-right: ${_ => Math.round(_.height || 0)}px;
  `,

  InputAsSelectButtonComponent: styled<
    React.FC<TextInputProps & {isOpen: boolean}>
  >(TextInput)`
    cursor: pointer;
    ${_ =>
      _.isOpen
        ? {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            transition: 'border-radius 0.5s ease'
          }
        : {
            transition: 'border-radius 0.5s ease 0.3s'
          }}
  `,
  CustomOptionsList: styled.ul<{isOpen: boolean}>`
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    position: absolute;
    top: 100%;
    margin: 0;
    list-style: none;
    left: 0;
    right: 0;
    transition: max-height 0.5s ease-out;
    padding: 0;
    z-index: 1;
    ${_ => ({
      backgroundColor: _.theme.colors.background.white,
      border: `1px solid ${_.theme.colors.border.default}`,
      ...(_.isOpen
        ? {
            overflow: 'auto',
            maxHeight: '200px',
            input: {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            }
          }
        : {
            transition: 'max-height 0.5s ease-out, border-width 0s ease 0.5s',
            borderWidth: 0,
            overflow: 'hidden',
            maxHeight: 0
          })
    })}
  `,
  CustomOption: styled.li<SelectProps>`
    border-top: ${_ => `1px solid ${_.theme.colors.border.muted}`};
    cursor: pointer;
    padding: 13px 16px;
    &:hover {
      background-color: ${_ => _.theme.colors.background.blueTint};
    }
  `
}
