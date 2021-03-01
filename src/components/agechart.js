import React, { Fragment } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from 'axios';
import useAsync from '../useAsync';
import chartTheme from '../chartTheme';
import Loading from './Loading';

// 연령별 api 데이터를 가져옴
async function getData(){
  const response = await axios.get(
      '/age'
  );
  console.log(`나이 데이터`);
  return response.data;
}

function AgeChart(){
  const [state] = useAsync(getData);
  const { loading, data: ageData, error } = state;

  if(loading) return <Loading/>;
  if(error) return <div>에러가 발생했습니다.</div>;
  if(!ageData) return null;

  const series1 = []; // 연령 차트에 들어갈 데이터
  
  for (let i = 0; i < ageData.length; i++) {
    series1.push({ name: i===0 ? '9세이하' : i*10+'대', y: Number(ageData[i].confCase._text)}); // 연령대별로 목록과 해당하는 연령대의 데이터를 넣음
  }
  const options = {
    lang:{
      thousandsSep:','
    },
    chart: {
      type: 'pie' // bar차트. 아무 설정이 없으면 line chart가 된다.
    },
    title: {
      text: '📉 대한민국 연령대별 현황 📉'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'category'
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b> : <b>{point.y}</b>"
        }
      }
    },
    series: [{
      name: "data",
      data: series1
    }]
  };
  Highcharts.setOptions(chartTheme.theme);  // 어두운 테마 적용
  
  return (
    <Fragment>
      <HighchartsReact highcharts = { Highcharts } options = { options } />
    </Fragment>
  );
}

export default AgeChart;