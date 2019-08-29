import {DefaultTheme} from 'styled-components'
import {getTextColor, getFontFamily} from '../utils'
import {TextVariant, TextIntent, TextColor, TextFontFamily} from '../types'

export const getTextStyle = ({
  variant = 400,
  intent,
  color = 'default',
  fontFamily
}: {
  variant?: TextVariant
  intent?: TextIntent
  color?: TextColor
  fontFamily?: TextFontFamily
} = {}) => (_: {theme: DefaultTheme}) => {
  return {
    /**
     * It's useful to have 600 because `Link` uses the `Text` component.
     * A `Link` could be used as 600 in the context of a breadcrumb.
     */
    600: `
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: -0.07px;
      /**
       * Use font family display because the font-size is 20px.
       */
      font-family: ${
        fontFamily ? getFontFamily(fontFamily)(_) : _.theme.fontFamilies.display
      };
      color: ${getTextColor(intent || color)(_)}
    `,
    500: `
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.05px;
      font-family: ${
        fontFamily ? getFontFamily(fontFamily)(_) : _.theme.fontFamilies.ui
      };
      color: ${getTextColor(intent || color)(_)}
    `,
    400: `
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.05px;
      font-family: ${
        fontFamily ? getFontFamily(fontFamily)(_) : _.theme.fontFamilies.ui
      };
      color: ${getTextColor(intent || color)(_)}
    `,
    300: `
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0;
      font-family: ${
        fontFamily ? getFontFamily(fontFamily)(_) : _.theme.fontFamilies.ui
      };
      color: ${getTextColor(intent || color)(_)}
    `
  }[variant]
}
