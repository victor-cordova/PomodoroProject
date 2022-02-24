import React from "react";

function numberToTime(number) {

    if (0 < number && number < 3660) {
        const minute = Math.floor(number/60);
        const second = number - minute * 60;

        return {minute: minute, second: second};
    }
    return {minute: 0, second: 0};
}

function defineRestAndFocusTime (restTime, focusTime, timingPomodoro) {
    if(timingPomodoro) {
        return  focusTime;
    }
    return  restTime;
}

function functionDefineTime (time, shortRestTime, longRestTime, pomodoroSeries) {
    return function (timingPomodoro) {
        if (pomodoroSeries > 1) {
            return defineRestAndFocusTime(shortRestTime, time, timingPomodoro)
            // defineRestAndFocusTime(shortRestTime, time, timingPomodoro)
            // if(timingPomodoro) {
            //     return  time;
            // }
            // return  shortRestTime;
        }
        defineRestAndFocusTime(longRestTime, time, timingPomodoro)
        return defineRestAndFocusTime(longRestTime, time, timingPomodoro);
    }
}

// function functionReducerSeries(pomodoroSeries, setPomodoroSeries) {

//     return function () {
        
//     }
// }

function functionReducerClock(timingPomodoro, setTimingPomodoro, setPlayTimer, setTime, setShortRestTime, defaultTime, restDefaultTime, pomodoroSeries, setPomodoroSeries) {
    
    let reducer;

    // if (timingPomodoro && pomodoroSeries <=0) {

    // }
    (timingPomodoro) ? reducer = setTime : reducer = setShortRestTime;

    return function (timer, timeDefinided) {
        reducer(timeDefinided);

        if (timeDefinided < 0) {

            clearInterval(timer);
            setTimingPomodoro(!timingPomodoro);    
            setPlayTimer(false)
            if (!timingPomodoro) {

                setPomodoroSeries(pomodoroSeries-1);
                console.log(pomodoroSeries);
                setTime(defaultTime)
            }
            else {
                setShortRestTime(restDefaultTime)
            }
            // return false;
        }
        // return true;
    }

}

class PomodoroPlayer {
    constructor( playTimer, setPlayTimer, setTime ) {
        this.playTimer = playTimer;
        this.setPlayTimer = setPlayTimer;
        this.setTime = setTime;
    }
  
    onPlayOrPause() {
        this.setPlayTimer(!this.playTimer);
    }
  
    onStop() {
        this.setPlayTimer(false);
        this.setTime(0);
    }
  }

function usePomodoroClock () {
    const defaultTime = 5;
    const shortRestDefaultTime = 2;
    const longRestDefaultTime = 3;
    const pomodoroDefaultSeries = 2;

    const [time, setTime] = React.useState(defaultTime);
    const [shortRestTime, setShortRestTime] = React.useState(shortRestDefaultTime);
    const [longRestTime, setLongRestTime] = React.useState(longRestDefaultTime);
    
    const [pomodoroSeries, setPomodoroSeries] = React.useState(pomodoroDefaultSeries);

    const [timingPomodoro, setTimingPomodoro] = React.useState(true);

    const [playTimer, setPlayTimer] = React.useState(false);
    
    const defineTime = functionDefineTime(time, shortRestTime, longRestTime, pomodoroSeries);

    let timeDefinided = defineTime(timingPomodoro);
    
    let minute = numberToTime(timeDefinided).minute;
    let second = numberToTime(timeDefinided).second;

    const reducerClock = functionReducerClock(timingPomodoro, setTimingPomodoro, setPlayTimer, setTime, setShortRestTime, defaultTime, shortRestDefaultTime, pomodoroSeries, setPomodoroSeries);

    

    React.useEffect(() => {
        let timer = null;
        
        if (playTimer && timeDefinided > 0) {
            timer = setInterval(() => {
                timeDefinided -= 1;
                reducerClock(timer, timeDefinided);     
                
            }, 1000);
        }

        else if(!playTimer) {
            clearInterval(timer);
        }

        return () => {clearInterval(timer)};
    },[playTimer, timingPomodoro]);

    return {
        time,
        setTime,
        PomodoroPlayer,
        minute,
        second,
        playTimer, 
        setPlayTimer
    }
}

export {usePomodoroClock};