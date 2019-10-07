import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  overflow: auto;
  position: relative;

  scroll-snap-type: x mandatory;
  -ms-scroll-snap-type: mandatory;
  -ms-scroll-snap-points-x: snapInterval(0, 95%);
`
export const Label = styled.span`
  display: flex;
  position: absolute;
  top: 0;
  left: 5px;
  overflow: auto;

  scroll-snap-type: x mandatory;
  -ms-scroll-snap-type: mandatory;
  -ms-scroll-snap-points-x: snapInterval(0, 95%);
`
