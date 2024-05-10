import React from 'react'
import '../App.css'

function Follower({posx,posy}) {
  return (
    <div style={{left: posx+"px",top: posy+"px"}} className="follower">
      <div className="background"></div>
      <p>🥴</p>
    </div>
  )
}

export default Follower
