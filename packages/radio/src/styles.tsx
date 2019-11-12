import * as tinycolor from 'tinycolor2'
import styled, {DefaultTheme} from 'styled-components'
import {RadioAppearanceType, RadioProps} from './types'
import {Text} from '@smashing/typography'
import {getLinearGradientWithStates} from './helpers'

type LabelProps = Required<Pick<RadioProps, 'disabled'>>
type CustomRadioProps = {
  appearance: RadioAppearanceType
  controlSize: number
  checked?: boolean
}
type OriginalRadioProps = {
  appearance: RadioAppearanceType
  checked?: boolean
}

export const Label = styled(Text)<LabelProps>`
  display: flex;
  align-items: center;
  margin: 0;
  cursor: ${_ => (_.disabled ? 'not-allowed' : 'pointer')};
`
export const CustomRadio = styled.div<CustomRadioProps>`
  width: ${_ => _.controlSize}px;
  height: ${_ => _.controlSize}px;
  margin-right: ${_ => _.theme.spacing.xs};
  display: flex;
  flex-shrink: 0;
  transition: all 150ms;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 100em;
  &:after {
    content: '';
    border-radius: 100em;
    background-color: transparent;
    width: ${_ => Math.min(_.controlSize / 3, 24)}px;
    height: ${_ => Math.min(_.controlSize / 3, 24)}px;
  }
`
export const OriginalRadio = styled.input<OriginalRadioProps>`
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
  ${_ => getRadioStyle(_.appearance, _.disabled, _.checked)}
`
export const getRadioStyle = (
  appearance: RadioAppearanceType,
  disabled = false,
  checked = false
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'outline':
      return {
        '& + div': {
          border: '2px solid currentColor'
        },
        '&:checked + div:after': {
          backgroundColor: 'currentColor'
        }
      }
    case 'default':
    default:
      const {scales, colors} = _.theme
      const disabledAppearance = {
        opacity: 0.8,
        backgroundImage: 'none',
        backgroundColor: scales.neutral.N2A,
        color: scales.neutral.N7,
        boxShadow: `inset 0 0 0 1px ${scales.neutral.N5A}`
      }
      const gradient = checked
        ? colors.checkbox.primary
        : colors.checkbox.default
      const primary = {
        backgroundImage: getLinearGradientWithStates(
          gradient.start,
          gradient.end
        ),
        focusColor: tinycolor(colors.checkbox.primary.start)
          .setAlpha(0.4)
          .toString(),
        border: gradient.end
      }

      return {
        '& + div': {
          color: 'white',
          backgroundColor: 'white',
          backgroundImage: primary.backgroundImage.base,
          boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 -1px 1px 0 ${scales.neutral.N3A}`,
          ...((disabled && disabledAppearance) || {})
        },
        '&:checked + div:after': {
          backgroundColor: 'currentColor'
        },
        ':hover:not([disabled]) + div': {
          backgroundImage: primary.backgroundImage.hover
        },
        ':focus:not([disabled]) + div': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${primary.focusColor}, inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 -1px 1px 0 ${scales.neutral.N5A}`
        },
        ':active:not([disabled]) + div': {
          backgroundImage: primary.backgroundImage.active,
          boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        }
      }
  }
}
