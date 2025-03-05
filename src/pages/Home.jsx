import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import { DiaryStateContext } from '../App';
import usePageTitle from '../hooks/usePageTitle';

const getMonthlyData = (pivotDate, data) => {
  // 이번 달의 가장 첫 번째 시간
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1, // 1일
    0, // 0시
    0, // 0분
    0 // 0초
  ).getTime();

  // 이번 달의 가장 마지막 시간
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0, // 0일
    23, // 23시
    59, // 59분
    59 // 59초
  ).getTime();

  // 일기 데이터 중 생성된 날짜가 이번 달 1일 ~ 말일 사이라면 이번 달에 생성된 일기
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const [pivotDate, setPivotDate] = useState(new Date());
  const data = useContext(DiaryStateContext);
  usePageTitle('감정 일기장');

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text="<" />}
        rightChild={<Button onClick={onIncreaseMonth} text=">" />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};
export default Home;
