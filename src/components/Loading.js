import React from "react";
import styled, { keyframes, css } from 'styled-components'

const Content = styled.div`
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.1);
`;
const LoadWrapp = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
`;

const LoadingF = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const LetterMixin = css`
  float: left;
  font-size: 20px;
  color: #fff;
  animation: ${LoadingF} 1.6s infinite linear;

`;

const Letter01 = styled.div`
  ${LetterMixin};
  animation-delay: 0.48s;
`;
const Letter02 = styled.div`
  ${LetterMixin};
  animation-delay: 0.6s;
`;
const Letter03 = styled.div`
  ${LetterMixin};
  animation-delay: 0.72s;
`;
const Letter04 = styled.div`
  ${LetterMixin};
  animation-delay: 0.84s;
`;
const Letter05 = styled.div`
  ${LetterMixin};
  animation-delay: 0.96s;
`;
const Letter06 = styled.div`
  ${LetterMixin};
  animation-delay: 1.08s;
`;
const Letter07 = styled.div`
  ${LetterMixin};
  animation-delay: 1.2s;
`;
const Letter08 = styled.div`
  ${LetterMixin};
  animation-delay: 1.32;
`;
const Letter09 = styled.div`
  ${LetterMixin};
  animation-delay: 1.44s;
`;
const Letter10 = styled.div`
  ${LetterMixin};
  animation-delay: 1.56s;
`;

function Loading(){

  return (
    <Content>
      <LoadWrapp>
            <Letter01>L</Letter01>
            <Letter02>o</Letter02>
            <Letter03>a</Letter03>
            <Letter04>d</Letter04>
            <Letter05>i</Letter05>
            <Letter06>n</Letter06>
            <Letter07>g</Letter07>
            <Letter08>.</Letter08>
            <Letter09>.</Letter09>
            <Letter10>.</Letter10>
      </LoadWrapp>
    </Content>
  )
}

export default Loading;