import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useAsync from '../useAsync';
import Loading from './Loading';
import SidoData from './SidoData';

const TableStyle = styled.div`
  table{
    width: 95%;
    color: #dee2e6c9;
    border: 1px solid #5c5c5c;
    border-collapse: collapse;
  }
  td {
    border-bottom: 1px solid #5c5c5c;
    border-left: 1px solid #5c5c5c46;
    border-right: 1px solid #5c5c5c46;
    font-size: 0.7rem;
    padding: 10px 0 10px 0;
  }
  th{
    border-bottom: 2px solid #5c5c5c;
    border-left: 1px solid #5c5c5c46;
    border-right: 1px solid #5c5c5c46;
    padding: 20px 0 20px 0;
    font-size: 0.7rem;
    background-color: #2b2b2b;

  }
  tr:hover{
    background-color: #419d9a36;
  }
  caption{
    padding-bottom: 25px;
    font-size: 1.2rem;
  }
`;

// 시도별 현황 api 데이터를 받아옴
async function getData(){
  const response = await axios.get(
      '/sido'
  );
  console.log(`시도별 데이터`);
  return response.data;
}

export default function SidoTable() {
  
  const [state] = useAsync(getData);
  const { loading, data: sidoData, error } = state;

  if(loading) return <Loading/>;
  if(error) return <div>에러가 발생했습니다.</div>;
  if(!sidoData) return null;

  const sidoToday = [];
  let cnt = 0;
  
  // axios로 받아온 시도별 데이터에서 오늘 데이터만 따로 배열을 만들어 push 한다
  for (const i in sidoData.today) {
    sidoData.today[i]['id'] = cnt;
    sidoToday.push(sidoData.today[i]);
    cnt++;
  }

  return (
    <TableStyle>
      <table align="center" radius="5">
        <caption>📉 국내 시도별 확진 현황표 📉</caption>
        <thead>
          <tr>
            <th>이 름</th>
            <th>확 진 자</th>
            <th>사 망 자</th>
            <th>격리 해제</th>
            <th>격 리 중</th>
            <th>해외유입</th>
          </tr>
        </thead>
        <tbody>
        {sidoToday.map(v => ( // 위에서 만든 오늘 데이터 배열을 배열메소드인 map을 이용해 SidoData 컴포넌트에 props로 데이터를 전달한다
          <SidoData // tr td로 이루어져있으며, props로 받은 데이터를 테이블의 한줄로 정리하는 작업을 수행하는 컴포넌트
            key={v.id}  // key props 전달
            gubun={v.gubun._text} 
            defCnt={v.defCnt._text} 
            incDec={v.incDec._text} 
            deathCnt={v.deathCnt._text} 
            isolClearCnt={v.isolClearCnt._text} 
            isolIngCnt={v.isolIngCnt._text} 
            overFlowCnt={v.overFlowCnt._text}/>
        ))}
          
        </tbody>
      </table>
    </TableStyle>
  );
}