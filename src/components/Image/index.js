import React from 'react';
import styled from 'styled-components';

const Image = ({...props}) => {
    return (
        <StyledImage {...props}>
        </StyledImage>
    )
}

const StyledImage = styled.Image`
  width: 128px;
  height: 128px;
`

export default Image