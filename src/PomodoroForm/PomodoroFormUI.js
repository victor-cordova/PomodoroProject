import React from "react";

function PomodoroFormUI (props) {
    
    return (
        <section>
            <label>Focus:</label>
            <input 
            className="inputFocusTime"
            type="number"
            
            onChange={props.inputTime}
            onClick={() => props.typeInput("focusInput")}
            // dataA
            // min="5"
            // max="50"
            // onChange={props.inputFocusTime}
            />
            
            <label>shortRest:</label>
            <input 
            className="inputShortRestTime"
            type="number"
            // min="5"
            // max="50"
            onChange={props.inputTime}
            onClick={() => props.typeInput("shortRestInput")}
            />
            
            <label>longRest:</label>
            <input 
            className="inputLongRestTime"
            type="number"
            min="5"
            max="50"
            onChange={props.inputTime}
            onClick={() => props.typeInput("longRestInput")}
            />

            <label>Close:</label>
            <input
            type="button"
            className="closeForms"
            onClick={props.onClose}/>
            
            <label>Save:</label>
            <input
            type="button"
            className="saveForms"
            onClick={props.onSave}/> 
        </section>
    );
}

export {PomodoroFormUI};