import styled from 'styled-components/macro'

export const ListContainer = styled.div`
  display: flex;
  scroll-snap-type: x mandatory;
  -ms-scroll-snap-type: mandatory;
  overflow: auto;
`

export const ListItem = styled.div<{overlapSize: number}>`
  flex: ${_ => `1 0 calc(100% - ${_.overlapSize}px)`};
  border-radius: 15px 15px 0 0;
  scroll-snap-align: start;
  -ms-scroll-snap-points-x: ${_ =>
    `snapInterval(0, calc(100% - ${_.overlapSize}px))`};

  margin-left: ${_ => _.theme.spacing.xxs};
  margin-right: ${_ => _.theme.spacing.xxs};

  background: red;
  height: 500px;

  &:first-of-type {
    margin-left: ${_ => _.theme.spacing.sm};
  }

  &:nth-of-type(odd) {
    background-color: blue;
  }
`
