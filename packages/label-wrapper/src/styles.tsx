import styled from 'styled-components'

export const Wrapper = styled.div<{errorTitle: string}>`
  position: relative;

  ${props => _ =>
    props.errorTitle.length > 0 && {
      '& * ': {
        color: _.theme.colors.error.red,
        borderColor: _.theme.colors.error.red
      },
      input: {
        boxShadow: `inset 0 0 0 1px ${_.theme.colors.error.red}, inset 0 1px 2px ${_.theme.colors.error.red}`,

        '&:focus': {
          boxShadow: `inset 0 0 0 1px ${_.theme.colors.error.red}, inset 0 1px 2px ${_.theme.colors.error.red}`
        },

        '&::placeholder': {
          color: _.theme.colors.error.red
        }
      },
      svg: {
        '& *': {
          stroke: _.theme.colors.error.red
        }
      }
    }}
`
export const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: ${_ => _.theme.colors.background.default};
  background: ${_ => _.theme.colors.background.default};
  padding: 0 5px;
  z-index: 10;

  font-family: Nunito, sans-serif;
  font-weight: 500;
  font-size: 12px;
`

export const Error = styled(Label)`
  top: initial;
  bottom: -11px;
  color: ${_ => _.theme.colors.error.red};
`
