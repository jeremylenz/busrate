import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`
  font-size: 1.5em;
  cursor: pointer;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 45%;
  text-align: center;

  border-width: 2px 1px 2px 2px;
  border-radius: 8px 0 0 8px;
  border-style: solid;
  border-color: #6262e0
  padding-top: 5px;
  padding-bottom: 5px;

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
`
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TerminalChooser = (props) => {

  const { terminals, selected, handleTerminalSelection } = props


  return (
    <div>
      <StyledFlexContainer>
      {terminals.map((terminal) => {
        let termClass = 'bus-terminal'
        if (terminal === selected) termClass += ' selected'
        console.log(termClass)
        return (
            <StyledDiv key={terminal} className={termClass} onClick={() => handleTerminalSelection(terminal)}>Toward {terminal}</StyledDiv>
        )
      })
      }
      </StyledFlexContainer>
    </div>
  )

};

export default TerminalChooser;