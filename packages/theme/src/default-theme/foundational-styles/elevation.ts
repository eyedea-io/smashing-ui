import colors from "./colors"
import scales from "./scales"

export default {
  background: {
    backgroundColor: colors.background.tint1
  },
  container: {
    backgroundColor: colors.background.white,
    boxShadow: `rgba(67, 90, 111, 0.3) 0px 0px 1px`
  },
  card: {
    backgroundColor: colors.background.white,
    boxShadow: `rgba(67, 90, 111, 0.3) 0px 0px 1px, rgba(67, 90, 111, 0.47) 0px 2px 4px -2px`
  },
  dropdown: {
    backgroundColor: colors.background.white,
    boxShadow: `rgba(67, 90, 111, 0.3) 0px 0px 1px, rgba(67, 90, 111, 0.47) 0px 5px 8px -4px`
  },
  toast: {
    backgroundColor: colors.background.white,
    boxShadow: `rgba(67, 90, 111, 0.3) 0px 0px 1px, rgba(67, 90, 111, 0.47) 0px 8px 10px -4px`
  },
  dialog: {
    backgroundColor: colors.background.white,
    boxShadow: `rgba(67, 90, 111, 0.3) 0px 0px 1px, rgba(67, 90, 111, 0.47) 0px 16px 24px -8px`
  },
  overlay: {
    backgroundColor: scales.neutral.N7A
  }
}
