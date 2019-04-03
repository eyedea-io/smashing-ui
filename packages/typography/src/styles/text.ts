import {DefaultTheme} from "styled-components"

export const getTextStyle = (variant: number) => (_: {theme: DefaultTheme}) => {
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
      font-family: ${_.theme.fontFamilies.display};
    `,
    500: `
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.05px;
      font-family: ${_.theme.fontFamilies.ui};
    `,
    400: `
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.05px;
      font-family: ${_.theme.fontFamilies.ui};
    `,
    300: `
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0;
      font-family: ${_.theme.fontFamilies.ui};
    `
  }[variant]
}
