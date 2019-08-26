import {getTextStyle} from './text'
import {DefaultTheme} from 'styled-components'
import {ParagraphColor, ParagraphVariant, ParagraphFontFamily} from '../types'

/**
 * Text styles for paragraphs (multi line text).
 * This is used in the Paragraph.
 * @property {Object} text.500 - Required property.
 * @property {Object} text.400 - Required property. Default.
 * @property {Object} text.300 - Required property.
 */
export const getParagraphStyle = ({
  color = 'default',
  variant = 400,
  fontFamily
}: {
  color?: ParagraphColor
  variant?: ParagraphVariant
  fontFamily?: ParagraphFontFamily
} = {}) => (_: {theme: DefaultTheme}) => {
  return {
    500: `
      ${getTextStyle({variant: 500, color, fontFamily})(_)};
      line-height: 24px;
      margin-top: ${_.theme.spacing.md};
    `,
    400: `
      ${getTextStyle({variant: 400, color, fontFamily})(_)};
      line-height: 21px;
      margin-top: ${_.theme.spacing.xs};
    `,
    300: `
      ${getTextStyle({variant: 300, color, fontFamily})(_)};
      line-height: 18px;
      margin-top: ${_.theme.spacing.xs};
    `
  }[variant]
}
