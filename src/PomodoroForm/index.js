import React from "react";
import { PomodoroFormUI } from "./PomodoroFormUI";

import {PomodoroContext} from "../PomodoroContext";

function PomodoroForm () {
    const { 
        LOCAL_STORAGE_POMODORO,

        PomodoroDefaultTime,

        setPomodoroTime,

        moodPomodoro, 

        pomodoroSeries,
        setPomodoroSeries,

        setSettingButtonActivated
    } = React.useContext(PomodoroContext);

    
    let PomodoroDataNew = {...PomodoroDefaultTime, "series": pomodoroSeries};
    
    let PomodoroData = {...PomodoroDefaultTime, "series": pomodoroSeries};
    let typePomodoroInput = null;

    const typeInput = (type) => {
        typePomodoroInput = type;
        
    }

    const returnRangeAndTransformByType = (type) => {
        if (type === "series") {
            return {"range": 10, "transform": 1}; //Transform is used to go from seconds to minutes
        }
        return {"range": 60, "transform": 60};
    }

    const inputData = (event) => {
        const dataCreated = event.target.value;
        const dataCreatedNumbered = Number(dataCreated);
        const {range, transform} = returnRangeAndTransformByType(typePomodoroInput);

        if (0 < dataCreatedNumbered && dataCreatedNumbered <= range) {
            PomodoroDataNew[typePomodoroInput] = dataCreatedNumbered * transform;
        }
        else {
            PomodoroDataNew[typePomodoroInput] = PomodoroData[typePomodoroInput];
            console.error("The input isn't in the range allowed.")
        }
    };

    const onClose = () => {

        setSettingButtonActivated(false);
    }
    
    const onSave = () => {

        const newSeriesValue = PomodoroDataNew.series;
        delete PomodoroDataNew.series;
        
        const pomodoroTimeNewStringified = JSON.stringify(PomodoroDataNew);
        const pomodoroSeriesNewStringified = JSON.stringify(newSeriesValue);

        localStorage.setItem(LOCAL_STORAGE_POMODORO.series, pomodoroSeriesNewStringified);
        localStorage.setItem(LOCAL_STORAGE_POMODORO.time, pomodoroTimeNewStringified);

        setPomodoroTime(PomodoroDataNew[moodPomodoro]);
        setPomodoroSeries(newSeriesValue);
        
        setSettingButtonActivated(false);
    }

    return (
        <PomodoroFormUI
            inputData={inputData}
            typeInput={typeInput}
            onClose={onClose}
            onSave={onSave}
        />
    );
};

export {PomodoroForm}