import React, { useState, useEffect } from "react";

// // const Textview = ({ text }) => {
// //   useEffect(() => {
// //     console.log(`Update : : text : ${text})`);
// //   });
// //   return <div>{text}</div>;
// // };

// const Textview = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log(`Update : : text : ${text})`);
//   });
//   return <div>{text}</div>;
// });

// // const CountView = ({ count }) => {
// //   useEffect(() => {
// //     console.log(`Update : : Count : ${count})`);
// //   });
// //   return <div>{count}</div>;
// // };

// const CountView = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(`Update : : Count : ${count})`);
//   });
//   return <div>{count}</div>;
// });

// const OptimizeTest = () => {
//   const [count, setCount] = useState(1);
//   const [text, setText] = useState("");

//   return (
//     <div style={{ padding: 50 }}>
//       <div>
//         <h2>count</h2>
//         <CountView count={count} />
//         <button onClick={() => setCount(count + 1)}>+</button>
//       </div>
//       <div>
//         <h2>text</h2>
//         <Textview text={text} />
//         <input value={text} onChange={(e) => setText(e.target.value)} />
//       </div>
//     </div>
//   );
// };

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA update - count: ${count}`);
  });
  return <div>{count}</div>;
});

//obj는 객체이고, 객체가 얕은 비교를 하기 때문에 리렌더 됨.
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`CounterB update - count : ${obj.count} `);
  });

  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count;
  //   if (prevProps.obj.count === nextProps.obj.count) {
  //     return true;
  //   }
  //   return false;
  // return true // 이전 프롭스가 현재 프롭스와  같다 => 리렌더링을 일으키지 않게
  // return false // 이전과 현재가 다르다 -> 리렌더링을 일으키ㅣ
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  //객체로 카운터를 사용하기
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <CounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
