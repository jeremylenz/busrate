import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #2634a7;
  border-bottom: 16px solid #f9e33c;
  animation: spin 2s linear infinite;
  -webkit-animation: spin 2s linear infinite;

  @keyframes spin {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
  @-webkit-keyframes spin {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }

  &.abs {
    position: absolute;
  }
`

const Loader = (props) => (
  <StyledDiv className={props.absolute ? 'abs loader' : 'loader'} />
);

export default Loader;
