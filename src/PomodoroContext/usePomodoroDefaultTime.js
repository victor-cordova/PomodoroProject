import React from "react";

function usePomodoroDefaultTime (pomodoroDefaultName, settingButtonActivated) {
    
    const objectDefaultTime = {
        focusTime: 5,
        shortRestTime: 2,
        longRestTime: 3
    }

    const objectDefaultTimeStringified = JSON.stringify(objectDefaultTime);
    
    const [pomodoroDefaultTime, setPomodoroDefaultTime] = React.useState(objectDefaultTime);

    // console.log(pomodoroDefaultTime);
    
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
                // console.log(localStoragePomodoroDefaultTimeParsed);
                setPomodoroDefaultTime(localStoragePomodoroDefaultTimeParsed);
                // console.log(pomodoroDefaultTime);
            }
            // setLoading(false);
            // setToDos(localStoragePomodoroDefaultTimeParsed);

        } catch (error) {
            console.error(error);
        }

        
      }, [settingButtonActivated]);

    return {
        pomodoroDefaultTime, 
        setPomodoroDefaultTime
    }
}

export {usePomodoroDefaultTime};