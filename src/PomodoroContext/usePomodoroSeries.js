import React from "react";

function usePomodoroSeries (POMODORO_SERIES, settingButtonActivated) {
    const POMODORO_DEFAULT_SERIES = 3;

    const defaultSeriesStringified = JSON.stringify(POMODORO_DEFAULT_SERIES);

    const [pomodoroSeries, setPomodoroSeries] = React.useState(POMODORO_DEFAULT_SERIES);

    React.useEffect( () => {  
        try {
            const localStoragePomodoroSeries = localStorage.getItem(POMODORO_SERIES);
            let localStoragePomodoroSeriesParsed;

            if (!localStoragePomodoroSeries) {
                localStorage.setItem(POMODORO_SERIES, defaultSeriesStringified);
            }
            else {
                localStoragePomodoroSeriesParsed = JSON.parse(localStoragePomodoroSeries);

                setPomodoroSeries(localStoragePomodoroSeriesParsed);
            }


        } catch (error) {
            console.error(error);
        }

        
      }, [settingButtonActivated]);

    return {
        pomodoroSeries, 
        setPomodoroSeries
    }
}

export {usePomodoroSeries};