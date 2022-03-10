import React from "react";

import "./PomodoroClock.css";

function PomodoroClockUI (props) {

    return (
        <section className="clock">
            <div className="clock__box">
                {props.minute >= 10 && <time className="clock__text">{`${props.minute}:`}</time>}
                {props.minute < 10 && <time className="clock__text">{`0${props.minute}:`}</time>}
                
                {props.second < 10 && <time className="clock__text">{`0${props.second}`}</time>}
                {props.second >= 10 && <time className="clock__text">{`${props.second}`}</time>}
            </div>
            
            <div className="player">
                <button 
                type="button"
                className="player__button"
                onClick={() => props.onPlayer("onPlayOrPause")}>
                    {props.playTimer === true && "PAUSE"}
                    {props.playTimer === false && "PLAY"}
                </button>

                <button 
                type="button"
                className="player__button"
                onClick={() => props.onPlayer("onStop")}>
                    STOP
                </button>
            </div>
        </section>
    );
}

export {PomodoroClockUI}