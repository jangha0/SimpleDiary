import React, { useRef, useState } from "react";
import DiaryList from "../DiaryList";
import DiaryEditor from "./DiaryEditor";
import "./App.css";

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList />
    </div>
  );
}

export default App;
