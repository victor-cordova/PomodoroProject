import React from "react";

function usePomodoroTime (pomodoroDefaultTime, pomodoroDefaultName) {

    
    const [ pomodoroTime, setPomodoroTime ] = React.useState(pomodoroDefaultTime["focusTime"]);

    React.useEffect( () => {  
        try {
            const localStoragePomodoroDefaultTime = localStorage.getItem(pomodoroDefaultName);
            let localStoragePomodoroDefaultTimeParsed;

            if (localStoragePomodoroDefaultTime) {
                localStoragePomodoroDefaultTimeParsed = JSON.parse(localStoragePomodoroDefaultTime);

                setPomodoroTime(localStoragePomodoroDefaultTimeParsed["focusTime"]);

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