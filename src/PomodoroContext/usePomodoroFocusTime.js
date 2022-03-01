import React from "react";

function usePomodoroFocusTime () {

    const defaultFocusTime = 5;
    const [focusTime, setFocusTime] = React.useState(defaultFocusTime);

    return {
        focusTime, 
        setFocusTime,

        defaultFocusTime
    }
}

export {usePomodoroFocusTime};