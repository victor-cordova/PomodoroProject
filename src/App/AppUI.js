import React from "react";

import { PomodoroClock } from "../PomodoroClock";
import { PomodoroContext } from "../PomodoroContext";
import { SettingsPomodoroButton } from "../SettingsPomodoroButton";

import {Modals} from "../Modals";

function AppUI () {
    const {settingButtonActivated} = React.useContext(PomodoroContext);

    return (
        <React.Fragment>
            <PomodoroClock/>

            <SettingsPomodoroButton/>   

            { settingButtonActivated && ( <Modals/> )}
        </React.Fragment>
    );
}

export {AppUI}