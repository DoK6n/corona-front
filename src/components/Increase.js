import React from 'react';
import styled from 'styled-components';

// 페이지 상단의 국내 현황판에 들어갈 변동 데이터 및 감염 데이터 숫자 스타일
const Increase = styled.span`
  display: inline-block;
  padding: 4px 10px;
  font-size: 75%;
  text-align: center;
  vertical-align: baseline;
  padding-right: .5rem;
  padding-left: .5rem;
  border-radius: 10rem;
  background-color: ${props => props.color || 'black'};
  color: #dee2e6;
  line-height: 1;
  font-weight: bold;
`;
// props로 color를 받고, 받은 색상으로 background-color를 변경함. props로 color를 받지 않는다면 기본값은 검은색 

export default Increase;