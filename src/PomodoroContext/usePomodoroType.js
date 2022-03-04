import React from "react";

function usePomodoroType () {

    const [typePomodoro, setTypePomodoro] = React.useState(true); //It refers if it's rest or focus.
    const [moodPomodoro, setMoodPomodoro] = React.useState("focusTime");

    return {
        typePomodoro, 
        setTypePomodoro,

        moodPomodoro, 
        setMoodPomodoro,
    }
}

export {usePomodoroType};