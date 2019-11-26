import * as React from 'react'
import styled from 'styled-components'

const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  pointer-events: all;
  svg {
    color: ${_ => _.theme.colors.text.muted};
    padding: 0 ${_ => _.theme.spacing.xs};
  }
  &:hover {
    cursor: pointer;
    svg {
      color: ${_ => _.theme.colors.text.default};
    }
  }
`

const CloseIconFC: React.FC<{onClickClose?: () => void}> = ({
  onClickClose,
  ...props
}) =>
  onClickClose ? (
    <CloseIconWrapper onClick={onClickClose} {...props}>
      <svg viewBox="0 0 16 16" width={16} height={16}>
        <path
          d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"
          fillRule="evenodd"
          fill="currentColor"
        />
      </svg>
    </CloseIconWrapper>
  ) : null

const CloseIcon = styled(CloseIconFC)``
export {CloseIcon, CloseIconFC}
