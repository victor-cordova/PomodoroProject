import React from "react";
import "./PomodoroClock.css";
import { PomodoroContext } from "../PomodoroContext";

function PomodoroClock() {

    const { minute, 
        second, 
        // setPlayTimer, 
        // time,
        // setTime, 
        // shortRestTime,
        onPlayer,
        // PomodoroPlayer,
        // setShortRestTime,
        playTimer} = React.useContext(PomodoroContext);

    return (
        <section>
            <div>
                {minute >= 10 && <time>{`${minute}:`}</time>}
                {minute < 10 && <time>{`0${minute}:`}</time>}
                
                {second < 10 && <time>{`0${second}`}</time>}
                {second >= 10 && <time>{`${second}`}</time>}
            </div>

            <button 
            type="button"
            onClick={() => onPlayer("onPlayOrPause")}>
            {/* onClick={play}> */}
                {playTimer === true && "PAUSE"}
                {playTimer === false && "PLAY"}
            </button>

            <button 
            type="button"
            onClick={() => onPlayer("onStop")}>
            {/* onClick={stop}> */}
                STOP
            </button>
        </section>
    );
}

export {PomodoroClock};