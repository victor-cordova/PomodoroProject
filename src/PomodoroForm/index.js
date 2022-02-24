import React from "react";

import {PomodoroContext} from "../PomodoroContext";

function PomodoroForm () {
    const { minute, 
        second, 
        setPlayTimer, 
        time,
        setTime, 
        shortRestTime,
        setShortRestTime,
        playTimer} = React.useContext(PomodoroContext);

    const inputTimePomodoro = (event) => {
        const timeCreated = event.target.value;
        const timeCreatedNumbered = Number(timeCreated);

        setTime(timeCreatedNumbered);
    };
    
    const inputTimeRest = (event) => {
        const timeCreated = event.target.value;
        const timeCreatedNumbered = Number(timeCreated);

        setTime(timeCreatedNumbered);
    };
    
    return (
        <section>
            <input 
            className="setPomodoroTime"
            type="number"
            // min="5"
            // max="50"
            onChange={inputTimePomodoro}/>
            
            <input 
            className="setRestTime"
            type="number"
            // min="5"
            // max="50"
            onChange={inputTimeRest}/>
            
            <label>Close:</label>
            <input
            type="button"
            className="closeForms"/>
            
            <label>Save:</label>
            <input
            type="button"
            className="saveForms"/> 
        </section>
    );
};

export {PomodoroForm}