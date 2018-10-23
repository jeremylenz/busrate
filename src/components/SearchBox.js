import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  font-size: 12em;
  text-align: center;
  border: none;
  margin: 8px;
  width: 95%;
`

const RoundRect = styled.div`
  border: 4px blue;
  border-style: solid;
  border-radius: 16px;
  width: 70%;
  margin: 10px;

`

class SearchBox extends React.Component {

  constructor () {
    super()
    this.state = {
      input: ''
    }
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({
      input: e.target.value
    })
  }

  render () {
    const { input } = this.state
    return (
      <>
        <RoundRect>
          <StyledInput value={input} onChange={this.handleInput} />
        </RoundRect>
      </>
    )
  }
}


export default SearchBox;
