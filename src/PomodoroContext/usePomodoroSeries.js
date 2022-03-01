import React from "react";

function usePomodoroSeries () {
    const pomodoroDefaultSeries = 2;

    const [pomodoroSeries, setPomodoroSeries] = React.useState(pomodoroDefaultSeries);

    return {
        pomodoroSeries, 
        setPomodoroSeries
    }
}

export {usePomodoroSeries};