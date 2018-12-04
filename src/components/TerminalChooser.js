import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`
  cursor: pointer;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 45%;
  text-align: center;
  background-color: white;

  border-width: 2px 1px 2px 2px;
  border-radius: 8px 0 0 8px;
  border-style: solid;
  border-color: #6262e0
  padding: 5px;

  & + div {
    border-style: solid;
    border-radius: 0 8px 8px 0;
    border-width: 2px 2px 2px 1px;
  }

  &.selected {
    font-weight: bold;
    font-style: italic;
    background-color: aliceblue;
  }

  @media only screen and (min-width: 600px) {
    font-size: 1.5em;
  }
  @media only screen and (max-width: 600px) {
    font-size: 1em;
  }
`
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  position: sticky;
  top: 0;
`

const TerminalChooser = (props) => {

  const { terminals, selected, handleTerminalSelection } = props


  return (
    <>
      <StyledFlexContainer>
      {terminals.map((terminal) => {
        let termClass = 'bus-terminal'
        if (terminal === selected) termClass += ' selected'
        return (
            <StyledDiv key={terminal} className={termClass} onClick={() => handleTerminalSelection(terminal)}>{terminal}</StyledDiv>
        )
      })
      }
      </StyledFlexContainer>
    </>
  )

};

export default TerminalChooser;
