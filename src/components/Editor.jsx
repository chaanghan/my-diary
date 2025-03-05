import React, { useEffect, useState } from 'react';
import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/get-stringed-date';

const Editor = ({ onSubmit, initData }) => {
  // 사용자가 작성한 내용
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });
  const nav = useNavigate();

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
    }
    setInput({
      ...input,
      [name]: value,
    });
  };
  // 생성 페이지, 수정 페이지에서도 사용되는 함수이기 때문에
  const onSubmitButtonClick = () => {
    onSubmit(input);
  };

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          type="date"
          name="createdDate"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          placeholder="오늘은 어땠나요?"
          name="content"
          value={input.content}
          onChange={onChangeInput}
        />
      </section>
      <section className="button_section">
        <Button text="취소하기" onClick={() => nav(-1)} />
        <Button text="작성완료" type="POSITIVE" onClick={onSubmitButtonClick} />
      </section>
    </div>
  );
};
export default Editor;
