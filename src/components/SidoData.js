import React from 'react';
import Increase from './Increase';

// SidoTable에서 props로 보낸 오늘 데이터를 받아서 테이블 한줄에 정리해주는 작업을 수행함
export default function SidoData(props){

  const color = {
    decide : '#e49c31c9', // 확진자
    death : '#ff4f70c9',  // 사망자
    clear : '#22ca80c9',  // 격리해제
    care : '#5f76e8c9'    // 격리중
  }

  return (
    <tr>
      <td>{props.gubun}</td>
      <td>
        {props.defCnt}&nbsp;&nbsp;&nbsp;&nbsp;
        <Increase color={color.decide}>+{props.incDec}</Increase>
      </td>
      <td><Increase color={color.death}>{props.deathCnt}</Increase></td>
      <td><Increase color={color.clear}>{props.isolClearCnt}</Increase></td>
      <td><Increase color={color.care}>{props.isolIngCnt}</Increase></td>
      <td>{props.overFlowCnt}</td>
    </tr>
  );
}