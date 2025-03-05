import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { DiaryDispatchContext, DiaryStateContext } from '../App';

const Edit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')) {
      // 일기 삭제
      onDelete(id);
      nav('/', { replace: true });
    }
  };

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true }); // nav는 모든 컴포넌트가 렌더링되고서 동작함
    }
    setCurDiaryItem(currentDiaryItem);
  }, [id]);

  const onSubmit = (input) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      const { createdDate, emotionId, content } = input;
      onUpdate(id, createdDate.getTime(), emotionId, content);
    }
    nav('/', { replace: true });
  };
  return (
    <div>
      <Header
        title="일기 수정하기"
        leftChild={<Button text="< 뒤로 가기" onClick={() => nav(-1)} />}
        rightChild={
          <Button text="삭제하기" type="NEGATIVE" onClick={onClickDelete} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};
export default Edit;
