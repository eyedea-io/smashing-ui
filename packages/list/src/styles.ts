import styled from 'styled-components'

export const ListContainer = styled.div`
  display: flex;
  overflow: auto;

  scroll-snap-type: x mandatory;
  -ms-scroll-snap-type: mandatory;
  -ms-scroll-snap-points-x: snapInterval(0, 95%);
`

export const ListItem = styled.div<{overlapSize: number}>`
  flex: ${_ => `1 0 calc(100% - ${_.overlapSize}px)`};
  scroll-snap-align: start;

  padding-left: ${_ => _.theme.spacing.sm};

  &:last-of-type {
    padding-right: ${_ => _.theme.spacing.sm};
  }

  > * {
    border-radius: 15px 15px 0 0;
  }
`
