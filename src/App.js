import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useReducer,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList.js";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

/*1 -> context로 export해야함. 그래야 접근 가능함.
 export default는 파일 하나만 사용 가능함.
그냥 export 붙이는 것은 여러개도 사용 가능.
-> 제일 위 import를 통해서 보면, React는 export default를 통해서 전달받았기 때문에
이름을 바꿔서도 사용 가능. 나머지 {}안에 들어있는 export const 요소들은 그냥 export만 되었기 때문에
반드시 비구조화 할당으로 불러와야함*/
export const DiaryStateContext = React.createContext();
/* 3  => 위에는 그냥 data만을 전달하기 위해서 놔둠. state context provider
state를 변화시키는 dispatch 함수들은 중첩으로 새로운 context생성하기 dispatch context provider
dispatch 함수들을 diaryStateContext의 value로 바로 전달하게되면, 전역에서 리렌더링이 발생되게
되므로 최적화가 의미없어짐
dispatchcontext는 리렌더링될 이유가 없음. 왜냐? 재생성되지 않는 함수들로만 이뤄져있기 때문
이후 return 부분엔서 statecontext하단에 추가*/
export const DiaryDispatchContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);
  /* 만약 useMemo 없이 생성을 하면, 앱 컴포넌트가 재생성이 될 때,
  해당 객체도 다시 재생성이  되게 됨. 그래서 최적화~!  */

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    /* 2 Provider 만들기 
    -> 자식요소에서 data사용해보기.
    DiaryList로 이동!*/
    /* dispatch context의 value는 useMemo 기능을 사용해서 위와같이 추가. 이유도 위에
        하단의 editor의 oncreate props 삭제, 리스트의 에딧, 리무브 props도
        삭제  => diaryEditor로 이동!*/
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
