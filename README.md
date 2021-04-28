![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/DoK6n/corona-front)
# 코로나 감염현황 사이트 ( 프론트 )

<br>

## ❗️ 프로젝트 소개

<br>

- 코로나 감염현황 정보를 데이터 시각화를 통해 제공하는 사이트

<br>



<br>

## ❗️ 프로젝트 기간

<br>

- 2021.01.07 ~ 2021.01.17 (1인)

<br>

## ❗️ 사용된 기술 & 라이브러리

<br>

-   **React-Hooks**
    - styled-components
    - axios
    - useReducer
    - useEffect
    - Flexbox


-   **HighCharts**
    - Pie 차트
    - PackedBubble 차트

    
<br>

## ❗️ 프로젝트 구현

<br>

### 1.  HighChart의 해외 감염현황 데이터 넣기

<br>

- 각 대륙별로 소속국가들을 HighChart의 들어가는 데이터 형식에 맞게 가공

```javascript

	...

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

	...
	
```

<big>**1.** </big> `targetContryKeys` : `map`을 사용하여 6대륙의 영문/한글명이 담긴 배열 `targetContinents`를   `key`값만 모은 새로운 배열을 담는다.<br>
<big>**2.** </big> `series` : `targetContryKeys`를 `map`을 사용해 `name`과 `data`를 반환한다.<br>
<small> `key값 = [ '유럽', '아프리카', '오세아니아', '아시아', '중동', '아메리카' ]` </small><br>

<big>**3.**</big>  `name` : `find`를 이용해 `targetContinents`에서 `key`값과 `map`에서 현재 돌고 있는 `targetContryKeys`의 현재 `key`값이 같을 때의 한글표기명 <small>`displayName`</small><br>
<big>**4.**</big> `continent` : `props`로 받은 api데이터의 `map`으로 돌고 있는 각 대륙에 속한 나라들<br>
<big>**5.**</big> `contries` : `continent` 객체를 배열로 저장<br>
<big>**6.**</big> `data` : 각 대륙별로 속해있는 나라들을 나누어서 `name`<small>나라명</small>, `value`<small>숫자형인 확진자수</small>를 `data`에 넣음




<br>

## ❗️ 링크

<br>

[ehrbs.shop](http://ehrbs.shop)

[cvd.cafe24app.com](http://cvd.cafe24app.com)

<br>

## ❗️ 만들면서 힘들었던 점

<br>

### CORS
처음 프로젝트를 시작할 때 백엔드와 프론트를 분리에서 개발하면서 프론트는 github page, 백엔드는 cafe24에서 배포를 하였는데,
이때 두 origin의 scheme이 http와 https로 달라서 문제가 발생하였다는 것을 알게 되었고, 이후 배포할 때 react는 build하여 build 폴더를 배포 한다는 것을 알게 되었고, cafe24에서 같이 배포를 하여 해결하였습니다.

<br>

### 반복문 성능 최적화
데이터 시각화기술을 사용해보기 위해 HighCharts를 적용해보았는데,
넣어야 할 데이터가 많을때 각 대륙별로 속해있는 국가의 데이터를 HighCharts에 데이터 형식에 맞게 바꾸어야 해서
받아온 객체를 반복하기 위해 `for in`을 사용 했는데 너무 느려서 구글을 통해 성능이 좋지않아 추천하지 않는다는걸 알게되었고, Object.keys라는 기능을 알게 되어 `map`과 `Object.keys`를 적절히 활용하여  해결하였습니다.

<br>

### 플렉스 박스로 레이아웃 구조잡기
이전에 학원다닐 때 Spring+JSP으로 팀프로젝트를 진행하였을 때는 css에 대한걸 잘 알지 못하여 css프레임워크인 부트스트랩 웹툴인 http://shoelace.io 를 이용하여 간편하게 레이아웃 구조를 잡았었습니다.
그러나 프론트엔드 개발자가 되려면 css도 잘 이해하고 있어야 한다고 생각하였기 때문에 이번 토이프로젝트에선 Flex를 이용해 반응형으로 레이아웃구조를 잡아보고 싶어서 드림코딩엘리 유튜브채널 영상을 보며 Flex를 공부하여 적용하게 되었습니다.
