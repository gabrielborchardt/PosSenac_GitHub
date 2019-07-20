import React from 'react';
import styled from 'styled-components';

const Input = ({...props}) => {
    return (
        <TextInput {...props}>
        </TextInput>
    )
}

const TextInput = styled.TextInput`
  height: 50px
  width: 300px;
  backgroundColor: #ffffff;
  margin: 10px;
  borderRadius: 4px;
  border: 1px solid black;
  padding: 5px;
`

export default Input