import React from "react";

import "./SettingsPomodoroButton.css"
import "./../styles/button.css";

import {PomodoroContext} from "../PomodoroContext";

function SettingsPomodoroButton () {
    const {
        settingButtonActivated,
        setSettingButtonActivated,

        setPlayTimer
    } = React.useContext(PomodoroContext);

    const activateSettingButton = () => {
        setSettingButtonActivated(true);
        setPlayTimer(false);
    };

    return (

        <div>
            {!settingButtonActivated && 
            <input
            className="button button__settings"
            type={"button"}
            onClick={activateSettingButton}/>
            }
            
        </div>
    );
}

export {SettingsPomodoroButton};