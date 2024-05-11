import React from 'react'
import '../App.css'

function Follower({posx,posy,emoji}) {
  return (
    <div style={{left: posx+"px",top: posy+"px"}} className="follower">
      <div className="background"></div>
      <p><img width="100px" src={emoji} alt="" /></p>
    </div>
  )
}

export default Follower
