import React from "react";

import { PomodoroClock } from "../PomodoroClock";
import { PomodoroContext } from "../PomodoroContext";
import { SettingsPomodoroButton } from "../SettingsPomodoroButton";
import { PomodoroAlarm } from "../PomodoroAlarm";

import {Modals} from "../Modals";

function AppUI () {
    const {settingButtonActivated} = React.useContext(PomodoroContext);
    // const audio = useMemo(() => new Au(url), []);
    return (
        <React.Fragment>
            <PomodoroClock/>

            <SettingsPomodoroButton/>   

            <PomodoroAlarm/>

            { settingButtonActivated && ( <Modals/> )}
            
            
        </React.Fragment>
    );
}

export {AppUI}