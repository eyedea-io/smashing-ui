import styled, {DefaultTheme} from 'styled-components'
import {RadioButtonAppearanceType, StyledLabelProps} from './types'
import {Text} from '@smashing/typography'

export const S = {
  Label: styled(Text)<StyledLabelProps>`
    display: flex;
    align-items: center;
    margin: 0;
    cursor: ${_ => (_.disabled ? 'not-allowed' : 'pointer')};
    ${_ => getLabelStyle(_.appearance, _.disabled, _.checked)};
  `,

  CustomRadioButton: styled.div.attrs({})<StyledLabelProps>`
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    margin-right: 8px;
    align-items: center;
    border-radius: 4px;
    transition: all 150ms;
    flex-shrink: 0;
    position: relative;
    box-sizing: border-box;
    border-radius: 100%;
    :after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: ${_ => (_.checked ? 'currentColor' : 'transparent')};
    }
  `,

  HiddenRadioButton: styled.input.attrs({
    type: 'radio'
  })<{appearance: RadioButtonAppearanceType}>`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: relative;
    white-space: nowrap;
    opacity: 0;
    width: 1px;
    ${_ => getRadioButtonStyle(_.appearance, _.disabled, _.checked)};
  `
}
export const getLabelStyle = (
  appearance: RadioButtonAppearanceType,
  disabled = false,
  checked = false
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'outline':
      const {
        theme: {
          colors: {border}
        }
      } = _
      return {
        color: checked ? border.active : border.default
      }
    case 'default':
    default:
      return {}
  }
}

export const getRadioButtonStyle = (
  appearance: RadioButtonAppearanceType,
  disabled = false,
  checked = false
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'outline':
      const color = disabled
        ? _.theme.colors.border.muted
        : checked
        ? _.theme.colors.border.active
        : _.theme.colors.border.default
      return {
        '& + div': {
          color,
          border: '2px solid currentColor',
          borderRadius: '100%',
          width: '24px',
          height: '24px',
          ':after': {
            width: '12px',
            height: '12px'
          }
        }
      }
    case 'default':
    default:
      return {
        '& + div': {
          color: _.theme.colors.border.active,
          border: '1px solid currentColor'
        }
      }
  }
}
