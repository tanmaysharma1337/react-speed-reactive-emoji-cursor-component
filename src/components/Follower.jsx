import React, { useState } from "react";
import "../App.css";

const emojiValues = {
  smiling: "/public/smiling.webp",
  whoozy: "/public/whoozy.webp",
};
let lastPosX = 0;
let lastPosY = 0;

function Follower({ posx, posy }) {
  const [emoji, setEmoji] = useState(emojiValues["smiling"]);

  function calculateState() {
    let isTired = false;

    let distance = Math.sqrt(
      Math.pow(posx - lastPosX, 2) + Math.pow(posy - lastPosY, 2) // sqrt((x1-x2) + (y2-y1)) gets us the distance
    ); // Get distance between last position and current postion (This gets us the speed by which the user moved the cursor)

    console.log(distance);
    lastPosX = posx;
    lastPosY = posy;
    if (distance > 100) {
      // If distance passes a certain value change the emoji icon state
      setEmoji(emojiValues["whoozy"]);
      isTired = true;
      if (isTired) {
        setTimeout(() => {
          setEmoji(emojiValues["smiling"]);
        }, 4000); // reset emoji back after 4 seconds ~ 4000ms
        isTired = false;
      }
    }
  }

  calculateState(posx, posy);
  return (
    <div
      style={{ left: posx - 50 + "px", top: posy - 50 + "px" }} // We subtract 50 from the actual position to keep the cursor centered , since the circular div have 100 diameter and we need subtract 50 to keep it centeralized
      className="follower"
    >
      <div className="background"></div>
      <p>
        <img width="100px" src={emoji} alt="" /> 
      </p>
    </div>
  );
}

export default Follower;
