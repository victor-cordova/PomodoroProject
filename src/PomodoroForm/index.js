import React from "react";
import { PomodoroFormUI } from "./PomodoroFormUI";

import {PomodoroContext} from "../PomodoroContext";

function PomodoroForm () {
    const { 
        pomodoroDefaultTime,
        setPomodoroDefaultTime,

        setPomodoroTime,

        moodPomodoro, 
        setMoodPomodoro,

        setSettingButtonActivated} = React.useContext(PomodoroContext);

    let pomodoroDefaultTimeNew = pomodoroDefaultTime;
    let typePomodoroInput = null;

    const typeInput = (type) => {
        typePomodoroInput = type;
        
    }

    const inputTime = (event) => {
        const timeCreated = event.target.value;
        const timeCreatedNumbered = Number(timeCreated);

        pomodoroDefaultTimeNew[typePomodoroInput] = timeCreatedNumbered;
    };
    
    const onClose = () => {
        setSettingButtonActivated(false);
    }
    
    const onSave = () => {
        const pomodoroDefaultTimeNewStringified = JSON.stringify(pomodoroDefaultTimeNew);
        setPomodoroTime(pomodoroDefaultTimeNew[moodPomodoro]);
        // setPomodoroDefaultTime(pomodoroDefaultTimeNew);
        localStorage.setItem("POMODORO_DEFAULT_TIME_V1", pomodoroDefaultTimeNewStringified);
        setSettingButtonActivated(false);
    }

    return (
        <PomodoroFormUI
            inputTime={inputTime}
            typeInput={typeInput}
            onClose={onClose}
            onSave={onSave}
            />
    );
};

export {PomodoroForm}