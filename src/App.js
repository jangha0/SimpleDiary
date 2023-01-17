import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList.js";
import "./App.css";

const dummyList = [
  {
    id: 1,
    author: "레니니",
    content: "헤이 1",
    emotion: 1,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "죠르디",
    content: "헤이 2",
    emotion: 4,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "개굴이",
    content: "헤이 3",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "알린",
    content: "헤이 4",
    emotion: 5,
    created_date: new Date().getTime(),
  },
];

const App = () => {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
};

export default App;
