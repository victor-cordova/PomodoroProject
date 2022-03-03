import React from "react";

function usePomodoroDefaultTime (pomodoroDefaultName) {
    
    const objectDefaultTime = {
        focusTime: 5,
        shortRestTime: 2,
        longRestTime: 3
    }

    const objectDefaultTimeStringified = JSON.stringify(objectDefaultTime);
    
    const [pomodoroDefaultTime, setPomodoroDefaultTime] = React.useState(objectDefaultTime);

    React.useEffect( () => {  
        try {
            const localStoragePomodoroDefaultTime = localStorage.getItem(pomodoroDefaultName);
            let localStoragePomodoroDefaultTimeParsed;

            if (!localStoragePomodoroDefaultTime) {
                localStorage.setItem(pomodoroDefaultName, objectDefaultTimeStringified);
                // localStoragePomodoroDefaultTimeParsed = [];
            }
            else {
                localStoragePomodoroDefaultTimeParsed = JSON.parse(localStoragePomodoroDefaultTime);
                setPomodoroDefaultTime(localStoragePomodoroDefaultTimeParsed);
            }
            // setLoading(false);
            // setToDos(localStoragePomodoroDefaultTimeParsed);

        } catch (error) {
            console.error(error);
        }

        
      }, []);

    return {
        pomodoroDefaultTime, 
        setPomodoroDefaultTime
    }
}

export {usePomodoroDefaultTime};