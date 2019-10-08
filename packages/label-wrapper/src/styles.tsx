import styled from 'styled-components'

export const Wrapper = styled.div<{errorTitle: string | boolean}>`
  display: flex;
  position: relative;
  background-color: white;
  background: white;

  & * {
    color: ${props => (props.errorTitle ? '#ff4752' : 'initial')};
    border-color: ${props => (props.errorTitle ? '#ff4752' : 'initial')};
  }

  input {
    box-shadow: ${props =>
      props.errorTitle
        ? 'inset 0 0 0 1px #ff4752, inset 0 1px 2px #ff4752'
        : 'yellow'};

    &:focus {
      box-shadow: ${props =>
        props.errorTitle
          ? 'inset 0 0 0 1px #ff4752, inset 0 1px 2px #ff4752'
          : 'yellow'};
    }

    &::placeholder {
      color: ${props => (props.errorTitle ? '#ff4752' : 'initial')};
    }
  }
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
  color: #ff4752;
`
