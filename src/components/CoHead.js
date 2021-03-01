import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useAsync from '../useAsync';
import Loading from './Loading';

const CoLogoBlock = styled.div`
  color: #dee2e6;
  position: absolute;
  width: 150px;
  font-size: 23px;
  height: 30px;
  top: 5px;
  left: 15vw;
  text-align: center;
`;

const CoHeadBlock = styled.div`
  width: 100vw;
  color: white;
  background: #2a2a2b;
  text-align: center;
  padding-bottom: 7vh;
  border: 1px solid #5c5c5c;
  border-left: 0;
  border-right: 0;
  h1 {
    width:100vw;
    padding-top: 64px;
  }
  h2 {
    margin-top: -10px;
  }
`; 
// api 데이터의 업데이트 날짜와 시간만 받아온다
async function getData(){
  const response = await axios.get('/kor');
  return response.data.createDt._text.split('.')[0];
}

function CoHead() {
  const [state] = useAsync(getData);
  const { loading, data: getUpdate, error } = state;

  if(loading) return <Loading/>;  // 로딩시 로딩 컴포넌트를 보여줌
  if(error) return <div>에러가 발생했습니다.</div>; // 에러시 보여줌
  if(!getUpdate) return null;

  return (
    <>
    <CoLogoBlock>💊 DoKyun</CoLogoBlock>
    <CoHeadBlock>
    <h1>코로나</h1>  
    <h2>감염 현황</h2>
    <p>
      <span>최근 업데이트: {getUpdate}</span>
    </p>
    </CoHeadBlock>
    </>
  );
}

export default CoHead;