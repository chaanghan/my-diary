import React, { useState } from 'react';
import Button from './Button';
import './DiaryList.css';
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState('latest'); // 정렬 타입

  // 정렬 타입 설정
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  // 일기 정렬
  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return Number(a.createdDate) - Number(b.createdDate); // 오래된 순으로 배치
      } else {
        return Number(b.createdDate) - Number(a.createdDate); // 최신 순으로 배치
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
        <Button
          text="새 일기 쓰기"
          type="POSITIVE"
          onClick={() => nav('/new')}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default DiaryList;
