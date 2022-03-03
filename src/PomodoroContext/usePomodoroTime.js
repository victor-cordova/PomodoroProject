import React from "react";

function usePomodoroTime (pomodoroDefaultTime) {

    
    const [ pomodoroTime, setPomodoroTime ] = React.useState(pomodoroDefaultTime["focusTime"]);
    
    return {
        pomodoroTime, 
        setPomodoroTime,
    }
}

export {usePomodoroTime};