import React from "react";

function usePomodoroDefaultTime (POMODORO_TIME, settingButtonActivated) {
    
    const DEFAULT_TIME = { 
        focusTime: 30*60,  //it's *60 to go from seconds to minutes.
        shortRestTime: 5*60,
        longRestTime: 15*60
    }
    
    const DEFAULT_TIME_STRINGIFIED = JSON.stringify(DEFAULT_TIME);
    
    const [PomodoroDefaultTime, setPomodoroDefaultTime] = React.useState(DEFAULT_TIME);
    
    React.useEffect( () => {  
        try {
            const localStoragePomodoroTime = localStorage.getItem(POMODORO_TIME);
            let localStoragePomodoroTimeParsed;

            if (!localStoragePomodoroTime) {
                localStorage.setItem(POMODORO_TIME, DEFAULT_TIME_STRINGIFIED);
            }
            else {
                localStoragePomodoroTimeParsed = JSON.parse(localStoragePomodoroTime);
                setPomodoroDefaultTime(localStoragePomodoroTimeParsed);
            }

        } catch (error) {
            console.error(error);
        }

        
      }, [settingButtonActivated]);

    return {
        PomodoroDefaultTime, 
        setPomodoroDefaultTime
    }
}

export {usePomodoroDefaultTime};