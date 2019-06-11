import {getTextStyle} from "./text"
import {DefaultTheme} from "styled-components"

/**
 * Text styles for paragraphs (multi line text).
 * This is used in the Paragraph.
 * @property {Object} text.500 - Required property.
 * @property {Object} text.400 - Required property. Default.
 * @property {Object} text.300 - Required property.
 */
export const getParagraphStyle = (variant: number) => (_: {
  theme: DefaultTheme
}) => {
  return {
    500: `
      ${getTextStyle(500)(_)};
      line-height: 24px;
      margin-top: ${_.theme.spacing.md};
    `,
    400: `
      ${getTextStyle(400)(_)};
      line-height: 21px;
      margin-top: ${_.theme.spacing.xs};
    `,
    300: `
      ${getTextStyle(300)(_)};
      line-height: 18px;
      margin-top: ${_.theme.spacing.xs};
    `
  }[variant]
}
