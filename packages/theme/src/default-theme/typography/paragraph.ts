import text from "./text"

/**
 * Text styles for paragraphs (multi line text).
 * This is used in the Paragraph.
 * @property {Object} text.500 - Required property.
 * @property {Object} text.400 - Required property. Default.
 * @property {Object} text.300 - Required property.
 */
export default {
  500: `
    ${text["500"]};
    line-height: 24px;
    margin-top: 16px;
  `,
  400: `
    ${text["400"]};
    line-height: 21px;
    margin-top: 12px;
  `,
  300: `
    ${text["300"]};
    line-height: 18px;
    margin-top: 12px;
  `
}
