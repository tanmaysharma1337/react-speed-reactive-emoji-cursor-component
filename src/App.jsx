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

  //Add Event listener in window object to catch cursor movements
  window.addEventListener(
    "mousemove",
    useCallback( // Throttling is required for getting best performance , here we are setting the function to run at 1 frame per 10ms also reduces unnesassry re-renders
      throttle(
        (e) => {
          let x = e.clientX; // Get X position of client cursor
          let y = e.clientY; // Get Y position of client cursor
          let distance = Math.sqrt(
            Math.pow(x - lastPosX, 2) + Math.pow(y - lastPosY, 2) // sqrt((x1-x2) + (y2-y1)) gets us the distance
          ); // Get distance between last position and current postion (This gets us the speed by which the user moved the cursor)
          lastPosX = x;
          lastPosY = y;
          if (distance > 100) { // If distance passes a certain value change the emoji icon state
            setEmoji(emojiValues["whoozy"]);
            isTired = true;
            if (isTired) {
              setTimeout(() => {
                setEmoji(emojiValues["smiling"]);
              }, 4000); // reset emoji back after 4 seconds ~ 4000ms
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
  ); // Wer subtract 50 from the actual position to keep the cursor centered , since the circular div have 100 diameter and we need subtract 50 to keep it centeralized
}

export default App;
