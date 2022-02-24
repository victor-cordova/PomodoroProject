import React from "react";
import {PomodoroContext} from "../PomodoroContext";

function SettingsPomodoroButton () {
    const {
        settingButtonActivated,
        setSettingButtonActivated
    } = React.useContext(PomodoroContext);

    const activateSettingButton = () => {
        setSettingButtonActivated(true);
        console.log("going well")
    };

    return (
        <input
        type={"button"}
        onClick={activateSettingButton}/>
    );
}

export {SettingsPomodoroButton};