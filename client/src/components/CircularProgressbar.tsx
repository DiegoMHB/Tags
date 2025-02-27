import {  buildStyles,CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import { TimeLeft } from "../types/appTypes";

type CircularProgressbarProps = {
    timeLeft:TimeLeft
}

export default function CircularProgressbarComp({ timeLeft}: CircularProgressbarProps) {

    const {percentage, minutes} = timeLeft;

  return (
    <CircularProgressbar
    value={percentage}
    styles={buildStyles({
      pathColor: minutes < 15? "#E63946":"#1D8348",    
      trailColor: "#CCCCCC",
      textColor: "#000000",
      textSize:44
  
    })}
    text={`${minutes}` + `'` }
  />
  )
}
