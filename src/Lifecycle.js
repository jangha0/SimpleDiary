import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    return () => {
      //unmount 시점에 실행되게 됨
      console.log("Unmount!");
    };
  }, []);

  return <div>Unmouont Testing Component</div>;
};

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  //mount 될 때마다
  useEffect(() => {
    console.log("Mount!");
  }, []);

  //update 될 때마다
  useEffect(() => {
    console.log("Update!");
  });

  //count값이 업데이트 될 때마다, count >5 마다
  useEffect(() => {
    console.log(`count is updated : ${count}`);
    if (count > 5) {
      alert("count가 5를 넘었습니다. 따라서 1로 초기화합니다.");
      setCount(1);
    }
  }, [count]);

  //text 값이 업데이트 될 때마다
  useEffect(() => {
    console.log(`text is updated : ${text}`);
  }, [text]);

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <div>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest />}
        {/* // isVisible이 true 면 뒤에도 같이 반환되어 렌더링 됨. false이면 단락회로평가로 인해 뒤에도 렌더링되지 않음 */}
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;
