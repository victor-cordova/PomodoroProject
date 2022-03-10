import React from "react";
import {PomodoroContext} from "./../PomodoroContext"

import "./PomodoroTitle.css"

function PomodoroTitle () {

    const {
        settingButtonActivated
    } = React.useContext(PomodoroContext);

    return (
        <div>
            {!settingButtonActivated && <h1 className="title">{"Pomodoro"}</h1>}
        </div>
    );
}

export {PomodoroTitle};