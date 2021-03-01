import React from "react";
import GlobalChart from "./globalchart";
import axios from "axios";
import useAsync from "../useAsync";
import Loading from "./Loading";
// import GlobalData from "../config/sampleGlobalData.json";
// 공공 데이터 api가 느려서 샘플 데이터로 출력

// 해외 API 데이터를 받아옴
async function getData(){
  const response = await axios.get(
      '/global'
  );
  console.log(`해외 데이터`);
  return response.data;
}

function GlobalCard() {
  const [state] = useAsync(getData);
  const { loading, data: globalData, error } = state;

  if (loading) return <Loading />;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!globalData) return null;

  // props에 해외 데이터를 보냄
  return <GlobalChart data={globalData} />;
}

export default GlobalCard;
