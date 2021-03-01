import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import CoHead from "./components/CoHead";
import CoInfectData from "./components/CoInfectData";
import AgeCard from "./components/AgeCard";
import GenderCard from "./components/GenderCard";
import SidoTable from "./components/SidoTable";
import GlobalCard from "./components/GlobalCard";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    margin-top: -22px;
    background: #2a2a2b;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 10px;
      backgrount-color: #fffff;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 10px;
      background-color: #2f2f2f;
      &:hover {
        background-color: #3a3a3a;
      }
    }
  }
`;

// 레이아웃은 flex를 이용
// wrap을 이용해 넘치면 밑으로 정렬해주고, justify-content로 가운데로 정렬시킨다.
const ChartCards = styled.div`
  width: 100vw;
  height: auto;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
// CgartCards안에 들어갈 각 차트들의 공간
// 높이는 auto로 설정, 왼쪽과 오른쪽의 테두리는 지우고 위아래만 남기고, flex-grow를 이용해 한 줄에 1개의 차트들만 나오도록 반응형으로 채워줌
const Cards = styled.div`
  background: #2a2a2b;
  color: #fff;
  font-size: 1rem;
  width: 60vw;
  height: auto;
  border: 1px solid #3e3e40;
  border-left: 0;
  border-right: 0;
  border-radius: 5px;
  flex-grow: 1;
  padding: 50px 1px 50px 1px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <CoHead />
      <CoInfectData />
      <ChartCards>
        <Cards>
          <AgeCard />
        </Cards>
        <Cards>
          <GenderCard />
        </Cards>
        <Cards>
          <SidoTable />
        </Cards>
        <Cards>
          <GlobalCard />
        </Cards>
      </ChartCards>
    </>
  );
}

export default App;
