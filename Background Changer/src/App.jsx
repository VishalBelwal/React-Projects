import { useState } from "react"
import Buttons from './components/Buttons'

function App() {
  const [color, setColor] = useState("olive")         //the initial state has color olive and the reload technically resets the state. So, it gets the olive color.

  let buttonData = [
    {displaycolor: "Red", bgColor: "red"},
    {displaycolor: "Green", bgColor: "green"},
    {displaycolor: "Black", bgColor: "black"},
    {displaycolor: "Violet", bgColor: "violet"}
  ]

  let handleClick = (color) => {
    setColor(color);
  }

  return (
    <>
      <div style={{ backgroundColor: color }}>
        <Buttons buttons={buttonData} changeColor={handleClick}/>
      </div>
    </>
  );
}

export default App
