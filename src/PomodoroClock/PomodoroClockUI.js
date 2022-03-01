import React from "react";

function PomodoroClockUI (props) {

    return (
        <section>
            <div>
                {props.minute >= 10 && <time>{`${props.minute}:`}</time>}
                {props.minute < 10 && <time>{`0${props.minute}:`}</time>}
                
                {props.second < 10 && <time>{`0${props.second}`}</time>}
                {props.second >= 10 && <time>{`${props.second}`}</time>}
            </div>
            
            <button 
            type="button"
            onClick={() => props.onPlayer("onPlayOrPause")}>
                {props.playTimer === true && "PAUSE"}
                {props.playTimer === false && "PLAY"}
            </button>

            <button 
            type="button"
            onClick={() => props.onPlayer("onStop")}>
                STOP
            </button>
            
        </section>
    );
}

export {PomodoroClockUI}