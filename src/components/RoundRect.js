import styled from 'styled-components'

const RoundRect = styled.div`
  position: relative;
  z-index: 1;
  border: 3px #8994d4;
  border-radius: 8px;
  border-style: solid;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 6px;
  margin-bottom: 8px;
  text-align: left;
  font-size: 1.1em;
  overflow-x: scroll;
  overflow-y: visible;

  &.rating-details {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  @media only screen and (min-width: 600px) {
    &.rating-details {
      flex-direction: row;
    }
  }

  &.loading {
    padding-top: 60px;
    padding-bottom: 15px;
  }
`

export default RoundRect;
