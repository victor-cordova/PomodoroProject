import React from "react";

function usePomodoroTime (POMODORO_TIME, PomodoroDefaultTime) {

    
    const [ pomodoroTime, setPomodoroTime ] = React.useState(PomodoroDefaultTime["focusTime"]);

    React.useEffect( () => {  
        try {
            const localStoragePomodoroTime = localStorage.getItem(POMODORO_TIME);
            let localStoragePomodoroTimeParsed;

            if (localStoragePomodoroTime) {
                localStoragePomodoroTimeParsed = JSON.parse(localStoragePomodoroTime);

                setPomodoroTime(localStoragePomodoroTimeParsed["focusTime"]);

            }


        } catch (error) {
            console.error(error);
        }

        
      }, []);
    
    return {
        pomodoroTime, 
        setPomodoroTime,
    }
}

export {usePomodoroTime};