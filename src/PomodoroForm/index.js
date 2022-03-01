import React from "react";
import { PomodoroFormUI } from "./PomodoroFormUI";

import {PomodoroContext} from "../PomodoroContext";

function PomodoroForm () {
    const { 
        setFocusTime,
        setShortRestTime,
        setLongRestTime,

        inputType,
        setInputType,

        setSettingButtonActivated} = React.useContext(PomodoroContext);

    const typeInput = (settledInput) => {
        switch (settledInput) {
            case "focusInput":
                setInputType("focusInput");
                break;
            case "shortRestInput":
                setInputType("shortRestInput");
                break;
            case "longRestInput":
                setInputType("longRestInput");
                break;
        }
    }
    
    const inputTime = (event) => {
        const timeCreated = event.target.value;
        const timeCreatedNumbered = Number(timeCreated);

        let setTime = null;
        switch (inputType) {
            case "focusInput":
                setTime = setFocusTime;
                break;
            case "shortRestInput":
                setTime = setShortRestTime;
                break;
            case "longRestInput":
                setTime = setLongRestTime;
                break;
        }

        setTime(timeCreatedNumbered);
    };
    
    // function inputTime (event) {
    //     const timeCreated = event.target.value;
    //     const timeCreatedNumbered = Number(timeCreated);
        
    //     setTime(timeCreatedNumbered);
    // };
    
    const inputShortRestTime = (event) => {
        const timeCreated = event.target.value;
        const timeCreatedNumbered = Number(timeCreated);
        // console.log(variable)
        // console.log(event)
        setShortRestTime(timeCreatedNumbered);
    };

    const inputLongRestTime = (event) => {
        const timeCreated = event.target.value;
        const timeCreatedNumbered = Number(timeCreated);
        console.log(event)
        setLongRestTime(timeCreatedNumbered);
    };

    const onClose = () => {
        setSettingButtonActivated(false);
    }
    
    const onSave = () => {

        setSettingButtonActivated(false);
    }

    return (
        <PomodoroFormUI
            // inputFocusTime={inputFocusTime}
            inputShortRestTime={inputShortRestTime}
            inputLongRestTime={inputLongRestTime}
            inputTime={inputTime}
            typeInput={typeInput}
            onClose={onClose}
            onSave={onSave}
            />
    );
};

export {PomodoroForm}