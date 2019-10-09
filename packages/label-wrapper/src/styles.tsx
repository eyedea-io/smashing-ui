import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`
export const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: ${_ => _.theme.colors.labelWrapper.background};
  background: ${_ => _.theme.colors.labelWrapper.background};
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
