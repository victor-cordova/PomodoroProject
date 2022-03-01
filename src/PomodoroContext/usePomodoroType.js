import React from "react";

function usePomodoroType () {

    const [typePomodoro, setTypePomodoro] = React.useState(true);

    return {
        typePomodoro, 
        setTypePomodoro
    }
}

export {usePomodoroType};