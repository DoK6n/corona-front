import React, { Fragment } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";
import axios from "axios";
import useAsync from "../useAsync";
import chartTheme from "../chartTheme";
import Loading from "./Loading";

const ChartStyle = styled.div``;

// 성별 api 데이터를 가져옴
async function getData() {
  const response = await axios.get(
    "/gender"
  );
  console.log(`성별 데이터`);
  return response.data;
}

function GenderChart() {
  const [state] = useAsync(getData);
  const { loading, data: genderData, error } = state;

  if (loading) return <Loading />;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!genderData) return null;

  const options = {
    chart: {
      type: "pie", // bar차트. 아무 설정이 없으면 line chart가 된다.
    },
    title: {
      text: "📉 대한민국 성별 현황 📉",
    },
    xAxis: {
      type: "category",
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b> : <b>{point.y}</b>",
        },
      },
    },
    series: [
      {
        name: "data",
        data: [
          { name: "남자", y: Number(genderData[1].confCase._text) },  // 숫자형으로 바꿔서 차트의 데이터를 넣음
          { name: "여자", y: Number(genderData[0].confCase._text) },
        ],
      },
    ],
  };
  Highcharts.setOptions(chartTheme.theme);  // 어두운 테마 적용

  return (
    <Fragment>
      <ChartStyle>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </ChartStyle>
    </Fragment>
  );
}

export default GenderChart;
