import { useState, useCallback } from "react";
import throttle from "lodash.throttle";
import "./App.css";
import Follower from "./components/Follower";

function App() {
  const [posX, setPosX] = useState(0);
  const [posY, setPosy] = useState(0);

  window.addEventListener(
    "mousemove",
    useCallback(throttle(
      (e) => {
        let x = e.clientX;
        let y = e.clientY;
        setPosX(x);
        setPosy(y);
      },
      10,
      { trailing: true, leading: true }
    ),[setPosX,setPosy])
  );
  
  return (
    <div>
      <Follower posx={posX - 50} posy={posY - 50}></Follower>
    </div>
  );
}

export default App;
