import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { increment } from "./store";
import { fetchIncrementAsync } from "./store";

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.value); //state.slice1.value

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(fetchIncrementAsync())}>count is {counter}</button>
      </div>
    </>
  );
}

export default App;
