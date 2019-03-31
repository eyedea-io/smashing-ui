import colors from "../foundational-styles/colors"
import fontFamilies from "./font-families"

export default {
  900: `
    font-size: 35px;
    font-weight: 500;
    line-height: 40px;
    letter-spacing: -0.2px;
    font-family: ${fontFamilies.display};
    color: ${colors.text.dark};
  `,
  800: `
    font-size: 29px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: -0.2px;
    font-family: ${fontFamilies.display};
    color: ${colors.text.dark};
  `,
  700: `
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: -0.07px;
    font-family: ${fontFamilies.display};
    color: ${colors.text.dark};
  `,
  600: `
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.07px;
    font-family: ${fontFamilies.display};
    color: ${colors.text.dark};
  `,
  500: `
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.05px;
    font-family: ${fontFamilies.ui};
    color: ${colors.text.dark};
  `,
  400: `
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.05px;
    font-family: ${fontFamilies.ui};
    color: ${colors.text.dark};
  `,
  300: `
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0;
    font-family: ${fontFamilies.ui};
    color: ${colors.text.dark};
  `,
  200: `
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    font-family: ${fontFamilies.ui};
    color: ${colors.text.muted};
  `,
  100: `
    font-size: 11px;
    font-weight: 400;
    text-transform: uppercase;
    line-height: 16px;
    letter-spacing: 0.6px;
    font-family: ${fontFamilies.ui};
    color: ${colors.text.muted};
  `
}
