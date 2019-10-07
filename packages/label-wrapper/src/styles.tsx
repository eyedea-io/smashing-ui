import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  position: relative;
`
export const Label = styled.span`
  display: flex;
  position: absolute;
  top: -10px;
  left: 12px;
  background-color: white;
  padding: 0 5px;

  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
`

export const Error = styled(Label)`
  top: inherit;
  bottom: -8px;
  color: #ff4752;
`
