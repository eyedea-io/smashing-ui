import styled from 'styled-components'

export const Wrapper = styled.div<{errorTitle: string | boolean}>`
  display: flex;
  position: relative;
  background-color: white;
  background: white;

  ${props => _ =>
    props.errorTitle && {
      '& * ': {
        color: _.theme.colors.background.redTint,
        borderColor: _.theme.colors.background.redTint
      },
      input: {
        boxShadow: `inset 0 0 0 1px ${_.theme.colors.background.redTint}, inset 0 1px 2px ${_.theme.colors.background.redTint}`,

        '&:focus': {
          boxShadow: `inset 0 0 0 1px ${_.theme.colors.background.redTint}, inset 0 1px 2px ${_.theme.colors.background.redTint}`
        },

        '&::placeholder': {
          color: `${_.theme.colors.background.redTint}`
        }
      }
    }}
`
export const Label = styled.span<{errorTitle: string | boolean}>`
  display: flex;
  position: absolute;
  top: -10px;
  left: 12px;
  background-color: inherit;
  background: inherit;
  padding: 0 5px;

  font-family: Nunito, sans-serif;
  font-weight: 500;
  font-size: 12px;
`

export const Error = styled(Label)`
  top: inherit;
  bottom: -11px;
  color: ${_ => _.theme.colors.background.redTint};
`
