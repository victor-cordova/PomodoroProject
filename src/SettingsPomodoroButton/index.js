import React from "react";
import {PomodoroContext} from "../PomodoroContext";

function SettingsPomodoroButton () {
    const {
        setSettingButtonActivated,

        setPlayTimer
    } = React.useContext(PomodoroContext);

    const activateSettingButton = () => {
        setSettingButtonActivated(true);
        setPlayTimer(false);
    };

    return (
        <input
        type={"button"}
        onClick={activateSettingButton}/>
    );
}

export {SettingsPomodoroButton};