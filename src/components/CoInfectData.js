import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useAsync from '../useAsync';
import Loading from './Loading';
import Increase from './Increase'

// 전체 데이터 출력할 공간
const InfectDataBlock = styled.div`
  position: relative;
  left: 15vw;
  top: -5vh;
  background: #2e2e2e;
  width: 71vw;
  border: 1px solid #dee2e6;
  border-radius: 15px;
  text-align: center;
  height:auto;
  
  h2{
    color: #dee2e6;
  }
`;
  
// 각 데이터와 변동사항을 담을 공간
const DataCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
  
// DataCard 안의 세분화된 데이터를 담을 공간
const Card = styled.div`
  width: 120px;
  flex-grow: 1;
`;

// 글자 색상
const TextColor = styled.p`
  font-weight: bold;
  color: ${props => props.color || 'black'}
`;

const LodingCard = styled.div`
  background: #2a2a2a;
  width: 100vw;
  height: auto;
  border: 1px solid #3e3e40;
  border-left: 0;
  border-right: 0;

  border-radius: 5px;
  text-align: center;
  justify-content: center;
`;

  // useAsync에서는 promise의 결과를 바로 data에 담기 때문에, 요청을 한 이후 response에서 data를 추출하여 반환하는 함수를 따로 만듭니다.
  async function getData(){
    const response = await axios.get(
        // 'http://cvd.cafe24app.com/kor'
        '/kor'
    );
    console.log(`오늘 데이터`);
    return response.data;
  }

  async function getYDAData(){
    const response = await axios.get(
        // 'http://cvd.cafe24app.com/kor/yda'
        '/kor/yda'
    );
    console.log(`어제 데이터`);
    return response.data;
  }
  
  function CoInfectData() {

    const [state] = useAsync(getData);
    const [stateYDA] = useAsync(getYDAData);
    const { loading, data: infectData, error } = state;
    const { loadingYDA, data: infectDataYDA, errorYDA } = stateYDA;
    
    if(loading || loadingYDA) {
      return (
        <LodingCard>
          <Loading/>
        </LodingCard>
      )
    };
    if(error || errorYDA) return (
        <LodingCard>
          <div>에러가 발생했습니다.</div>
        </LodingCard>
      );
    if(!infectData || !infectDataYDA) return null;

    /*
      decide:총확진자
      death:총사망자
      clear:총격리해제
      care:치료중
      lethality:치명률
      accExam:총검사자
      exam:총검사중
      result:결과음성
    */

    // 변동률 데이터
    const changeRate = {
      decide : Math.abs(infectData.decideCnt._text-infectDataYDA.decideCnt._text),
      death : infectData.deathCnt._text-infectDataYDA.deathCnt._text,
      clear : infectData.clearCnt._text-infectDataYDA.clearCnt._text,
      care : infectData.careCnt._text-infectDataYDA.careCnt._text,
      lethality : (((infectData.deathCnt._text/infectData.decideCnt._text)*100).toFixed(2) - ((infectDataYDA.deathCnt._text/infectDataYDA.decideCnt._text)*100).toFixed(2)).toFixed(2),
      accExam : infectData.accExamCnt._text-infectDataYDA.accExamCnt._text,
      exam : infectData.examCnt._text-infectDataYDA.examCnt._text,
      result : infectData.resutlNegCnt._text-infectDataYDA.resutlNegCnt._text
    };

    // 오늘 데이터
    const dt = {
      decide : Number(infectData.decideCnt._text).toLocaleString(),
      death : Number(infectData.deathCnt._text).toLocaleString(),
      clear : Number(infectData.clearCnt._text).toLocaleString(),
      care : Number(infectData.careCnt._text).toLocaleString(),
      lethality : ((infectData.deathCnt._text/infectData.decideCnt._text)*100).toFixed(2)+'%',
      accExam : Number(infectData.accExamCnt._text).toLocaleString(),
      exam : Number(infectData.examCnt._text).toLocaleString(),
      result : Number(infectData.resutlNegCnt._text).toLocaleString()
    };

    // 음수 양수 체크후 "+" or "-" 출력
    const isPositive = (num) => Math.sign(num) === -1 ? "" : "+";

    return (
    <InfectDataBlock> {/* 국내 현황 데이터가 출력시킬 공간 */}
      <h2>국내 현황</h2>
      <DataCard>  {/* flex와 flex-wrap 사용*/}
        <Card>    {/* grow:1 */}
          <TextColor color="#f89009c9">{dt.decide}</TextColor> {/* 확진 데이터 숫자 */}
          <Increase color="#e49c31c9">                         {/* 변동률 데이터 */}
            {isPositive(changeRate.decide)}                    {/* 음수 양수 표시 */}
            {Number(changeRate.decide).toLocaleString()}
          </Increase>
          <TextColor color="#f89009c9">총확진자</TextColor>     {/* 데이터 명 */}
        </Card>
        <Card>
          <TextColor color="#ee2323c9">{dt.death}</TextColor>
          <Increase color="#ff4f70c9">
            {isPositive(changeRate.death)}
            {Number(changeRate.death).toLocaleString()}
          </Increase>
          <TextColor color="#ee2323c9">총사망자</TextColor>
        </Card>
        <Card>
          <TextColor color="#009a87">{dt.clear}</TextColor>
          <Increase color="#22ca80c9">
            {isPositive(changeRate.clear)}
            {Number(changeRate.clear).toLocaleString()}
          </Increase>
          <TextColor color="#009a87">총격리해제</TextColor>
        </Card>
        <Card>
          <TextColor color="#006dd7c9">{dt.care}</TextColor>
          <Increase color="#5f76e8c9">
            {isPositive(changeRate.care)}
            {Number(changeRate.care).toLocaleString()}
          </Increase>
          <TextColor color="#006dd7c9">치료중</TextColor>
        </Card>
        <Card>
          <TextColor color="#ee2323c9">{dt.lethality}</TextColor>
          <Increase color="#ff4f70c9">
            {isPositive(changeRate.lethality)}
            {changeRate.lethality}%
          </Increase>
          <TextColor color="#ee2323c9">치명률</TextColor>
        </Card>
        <Card>
          <TextColor color="#dee2e6c9">{dt.accExam}</TextColor>
          <Increase color="#505053">
            {isPositive(changeRate.accExam)}
            {Number(changeRate.accExam).toLocaleString()}
          </Increase>
          <TextColor color="#dee2e6c9">총검사자</TextColor>
        </Card>
        <Card>
          <TextColor color="#dee2e6c9">{dt.exam}</TextColor>
          <Increase color="#505053">
            {isPositive(changeRate.exam)}
            {Number(changeRate.exam).toLocaleString()}
          </Increase>
          <TextColor color="#dee2e6c9">검사중</TextColor>
        </Card>
        <Card>
          <TextColor color="#dee2e6c9">{dt.result}</TextColor>
          <Increase color="#505053">
            {isPositive(changeRate.result)}
            {Number(changeRate.result).toLocaleString()}
          </Increase>
          <TextColor color="#dee2e6c9">결과음성</TextColor>
        </Card>
      </DataCard>
    </InfectDataBlock>
  );
}

export default CoInfectData;