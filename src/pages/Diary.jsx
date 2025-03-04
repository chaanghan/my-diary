import React from 'react';
import { useParams } from 'react-router-dom';

const Diary = () => {
  const { id } = useParams();

  return <div>{id}번 일기입니다.</div>;
};
export default Diary;
