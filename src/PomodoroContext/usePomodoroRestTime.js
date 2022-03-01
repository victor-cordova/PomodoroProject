import React from "react";

function usePomodoroRestTime() {
    const shortRestDefaultTime = 2;
    const longRestDefaultTime = 3;

    const [shortRestTime, setShortRestTime] = React.useState(shortRestDefaultTime);
    const [longRestTime, setLongRestTime] = React.useState(longRestDefaultTime);    
    
    return {
        shortRestTime, 
        setShortRestTime,

        longRestTime, 
        setLongRestTime,

        shortRestDefaultTime,
        longRestDefaultTime
    };
}

export {usePomodoroRestTime};