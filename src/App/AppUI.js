import React from "react";
import './App.css';

import { PomodoroTitle } from "../PomodoroTitle";
import { PomodoroClock } from "../PomodoroClock";
import { PomodoroContext } from "../PomodoroContext";
import { SettingsPomodoroButton } from "../SettingsPomodoroButton";
import { PomodoroAlarm } from "../PomodoroAlarm";

import {Modals} from "../Modals";

function AppUI () {
    const {settingButtonActivated} = React.useContext(PomodoroContext);
    
    return (
        <React.Fragment>
            <PomodoroTitle/>

            <PomodoroClock/>

            <SettingsPomodoroButton/>   

            <PomodoroAlarm/>

            { settingButtonActivated && ( <Modals/> )}
            
            
        </React.Fragment>
    );
}

export {AppUI}