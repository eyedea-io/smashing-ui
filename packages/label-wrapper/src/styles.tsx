import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  background-color: white;
  background: white;
`
export const Label = styled.span`
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
  color: #ff4752;
`
