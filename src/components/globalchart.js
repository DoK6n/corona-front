import React, { Fragment } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import chartTheme from "../chartTheme";
// 해외 API 데이터를 받아옴
function GlobalChart(props) {
  const result = props.data;
  // targetContinents : 팩버블 차트의 목록인 6대륙
  const targetContinents = [
    {
      displayName: "Europe",
      key: "유럽",
    },
    {
      displayName: "Africa",
      key: "아프리카",
    },
    {
      displayName: "Oceania",
      key: "오세아니아",
    },
    {
      displayName: "Asia",
      key: "아시아",
    },
    {
      displayName: "Middle East",
      key: "중동",
    },
    {
      displayName: "America",
      key: "아메리카",
    },
  ];

  /* 
  targetContryKeys :  6대륙의 영문/한글명이 담긴 배열 targetContinents에서 
                      key값만 모은 새로운 배열을 담는다.
  series :  targetContryKeys를 map을 사용해 name과 data를 반환한다.
    * key값 = [ '유럽', '아프리카', '오세아니아', '아시아', '중동', '아메리카' ]
  
  name :  find를 이용해 targetContinents에서 key값과 
          현재 돌고 있는 map에서 targetContryKeys의 현재 key값이 같을 때의 한글표기명(displayName)
  continent :  props로 받은 api데이터의 map으로 돌고 있는 각 대륙에 속한 나라들
  contries :  continent 객체를 배열로 저장
  data :  각 대륙별로 속해있는 나라들을 나누어서 data에 넣음
  */
  const targetContryKeys = targetContinents.map((tc) => tc.key);
  const series = targetContryKeys.map((key) => {
    const name = targetContinents.find((tc) => tc.key === key).displayName;
    const continent = result[key];
    const contries = Object.keys(continent);
    const data = contries.map((contry) => ({
      name: continent[contry].nationNm._text,
      value: +continent[contry].natDefCnt._text,
    }));
    return {
      name,
      data,
    };
  });

  HC_more(Highcharts); //init module

  const options = {
    lang: {
      thousandsSep: ",",
    },
    chart: {
      type: "packedbubble",
      margin: [30, 0, 35, 0],
      height: "720px",
    },
    title: {
      text: "📉 해외 확진 현황 📉",
    },
    subtitle: {
      text: "최근 업데이트 : " + props.data.time,
      style: {
        color: "#BFBFBF",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.name} :</b> {point.y: ,.0f} 명",
    },
    plotOptions: {
      cursor: "pointer",
      packedbubble: {
        minSize: "30%",
        maxSize: "300%",
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
        },
        dataLabels: {
          enabled: true,
          format: "",
          filter: {
            property: "y",
            operator: ">",
            value: 250,
          },
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
      },
    },
    series: series
  };

  Highcharts.setOptions(chartTheme.theme);

  return (
    <Fragment>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Fragment>
  );
}

export default GlobalChart;
