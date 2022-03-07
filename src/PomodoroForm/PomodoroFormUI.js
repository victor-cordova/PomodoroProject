import React from "react";
import {PomodoroContext} from "../PomodoroContext";

function PomodoroFormUI (props) {
    return (
        <section>
            <label>Focus:</label>
            <input 
                className="inputFocusTime"
                type="number"
                onChange={props.inputData}
                onClick={() => props.typeInput("focusTime")}

            />
            
            <label>ShortRest:</label>
            <input 
                className="inputShortRestTime"
                type="number"
                onChange={props.inputData}
                onClick={() => props.typeInput("shortRestTime")}
            />
            
            <label>LongRest:</label>
            <input 
                className="inputLongRestTime"
                type="number"
                onChange={props.inputData}
                onClick={() => props.typeInput("longRestTime")}
            />

            <label>Series:</label>
            <input 
                className="inputSeries"
                type="number"
                onChange={props.inputData}
                onClick={() => props.typeInput("series")}

            />

            <label>Close:</label>
            <input
                type="button"
                className="closeForms"
                onClick={props.onClose}
            />
            
            <label>Save:</label>
            <input
                type="button"
                className="saveForms"
                onClick={props.onSave}
            /> 
        </section>
    );
}

export {PomodoroFormUI};