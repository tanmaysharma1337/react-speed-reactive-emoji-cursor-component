import { useState, useCallback } from "react";
import throttle from "lodash.throttle";
import "./App.css";
import Follower from "./components/Follower";

function App() {
  const emojiValues ={
    "smiling":"/public/smiling.webp",
    "whoozy":"/public/whoozy.webp"
  }
  const [posX, setPosX] = useState(0);
  const [posY, setPosy] = useState(0);
  const [emoji, setEmoji] = useState(emojiValues["smiling"]);

  let lastPosX = 0;
  let lastPosY = 0;
  let isTired = false;

  window.addEventListener(
    "mousemove",
    useCallback(
      throttle(
        (e) => {
          let x = e.clientX;
          let y = e.clientY;
          let distance = Math.sqrt(
            Math.pow(x - lastPosX, 2) + Math.pow(y - lastPosY, 2)
          );
          lastPosX = x;
          lastPosY = y;
          if (distance > 100) {
            setEmoji(emojiValues["whoozy"]);
            isTired = true;
            if (isTired) {
              setTimeout(() => {
                setEmoji(emojiValues["smiling"]);
              }, 4000);
              isTired = false;
            }
          }
          setPosX(x);
          setPosy(y);
        },
        10,
        { trailing: true, leading: true }
      ),
      [setPosX, setPosy]
    )
  );

  return (
    <div>
      <Follower posx={posX - 50} posy={posY - 50} emoji={emoji}></Follower>
    </div>
  );
}

export default App;
