import { useContext } from "react";
import DiaryItem from "./DiaryItem.js";

import { DiaryStateContext } from "./App.js";

const DiaryList = () => {
  /* App 컴포넌트로부터 prop으로 diaryList로 받고 있었음. diaryList=data state, 고로 삭제!!
  삭제한 후 아래에 const diaryList 추가
  DiaryStateContext는 export한 값이기 때문에 import해서 사용*/

  const diaryList = useContext(DiaryStateContext);
  /*이렇게 지정함으로써 diaryList의 hooks에 context가 들어간 것을 확인할 수 있음
  다시 app.js에서, DiaryList에는 더 이상 diaryList를 prop으로 줄 필요가 없기 때문에 제거*/

  /* editor 갔다온 후: proprs삭제 후 다음의 것 추가 */
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
          // <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
          // props drilling도 제거하기!
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
