import { useRef, useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList.js";
import "./App.css";
import { useEffect } from "react";

// https://jsonplaceholder.typicode.com/comments

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  //AWAIT을 사용하기 위해PROMISE를 반환하도록 ASYNC 만들기.
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    //slice-20개만 추려내기
    //map: 배열의 모든 요소를 순회 후 댜시 새로운 배열을 만듦
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        //math.random()*5: 0에서 4까지의 랜덤 난수를 생성
        //math.foor: 정수로 바꾸기
        //+1: 1~5까지로 값 만들기
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        //newItem에 했던 것처럼 dataId.current에 1을 더해줘야하며,
        //이미 리턴된 값이라 리턴할 수 없으므로 값에 바로 ++로 1추가해줌.
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  //mount 시점에 API호출하도록 만들기
  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;
