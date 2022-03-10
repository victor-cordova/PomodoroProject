import React from "react";
import { PomodoroContext } from "../PomodoroContext";
import audioTone from "../content/alarm_tone_1_cut_v2.mp3";

function PomodoroAlarm() {
    const {
        pomodoroTime,
        moodPomodoro,
    } = React.useContext(PomodoroContext);

    React.useEffect( () => {
        let alarmTone = null;

        if (moodPomodoro === "focusTime" && pomodoroTime === 0) {
            alarmTone = new Audio(audioTone);
            alarmTone.load();
            alarmTone.play();
        }
    }, [pomodoroTime]);

    return (
        <audio/>
    );
}

export {PomodoroAlarm};