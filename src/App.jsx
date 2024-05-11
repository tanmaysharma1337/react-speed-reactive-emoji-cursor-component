import { useState, useCallback } from "react";
import throttle from "lodash.throttle";
import "./App.css";
import Follower from "./components/Follower";

function App() {
  const [posX, setPosX] = useState(0);
  const [posY, setPosy] = useState(0);

  //Add Event listener in window object to catch cursor movements
  window.addEventListener(
    "mousemove",
    useCallback( // Throttling is required for getting best performance , here we are setting the function to run at 1 frame per 10ms also reduces unnesassry re-renders
      throttle(
        (e) => {
          let x = e.clientX; // Get X position of client cursor
          let y = e.clientY; // Get Y position of client cursor
          setPosX(x); //pass the x coordinate to component
          setPosy(y); //pass the x coordinate to component
        },
        20,
        { trailing: true, leading: true }
      ),
      [setPosX, setPosy]
    )
  );

  return (
    <div>
      <Follower posx={posX} posy={posY}></Follower>
    </div>
  );
}

export default App;
