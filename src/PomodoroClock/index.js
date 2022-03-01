import React from "react";
import "./PomodoroClock.css";
import { PomodoroContext } from "../PomodoroContext";
import { PomodoroClockUI } from "./PomodoroClockUI";

class PomodoroPlayer {
    constructor( playTimer, setPlayTimer, setTime, typePomodoro, setTypePomodoro, setPomodoroSeries, pomodoroSeries ) {
        this.playTimer = playTimer;
        this.setPlayTimer = setPlayTimer;
        this.setTime = setTime;
        this.setTypePomodoro = setTypePomodoro;
        this.typePomodoro = typePomodoro;
        this.setPomodoroSeries = setPomodoroSeries;
        this.pomodoroSeries = pomodoroSeries;
    }
  
    onPlayOrPause() {
        this.setPlayTimer(!this.playTimer);
    }
  
    onStop() {
        this.setPlayTimer(false);
        this.setTime(-1);
        if (!this.typePomodoro) {
            this.setPomodoroSeries(this.pomodoroSeries-1);
        }
        this.setTypePomodoro(!this.typePomodoro);
        
    }
}

function numberToTime(number) {

    if (0 < number && number < 3660) {
        const minute = Math.floor(number/60);
        const second = number - minute * 60;

        return {minute: minute, second: second};
    }
    return {minute: 0, second: 0};
}

function defineRestAndFocusTime (restTime, focusTime, typePomodoro, restType) {
    if(typePomodoro) {
        
        return  {time: focusTime, mood: "focus"};
    }
    return  {time: restTime, mood: restType};
}

function functionDefineTime (focusTime, shortRestTime, longRestTime, pomodoroSeries, typePomodoro) {
    if (pomodoroSeries > 0) {
        const timeDefinidedAndMood = defineRestAndFocusTime(shortRestTime, focusTime, typePomodoro, "shortRest")
        
        return timeDefinidedAndMood;
    }
    const timeDefinidedAndMood = defineRestAndFocusTime(longRestTime, focusTime, typePomodoro, "longRest")
    
    return timeDefinidedAndMood;
}



function functionReducerClock(typePomodoro, setTypePomodoro, setPlayTimer, pomodoroSeries, setPomodoroSeries, setTime, defaultTime, moodPomodoro) {
    
    let reducer;

    reducer = setTime;

    return function (timer, timeDefinided) {
        reducer(timeDefinided);

        if (timeDefinided < 0) {
            clearInterval(timer);
            setTypePomodoro(!typePomodoro);    
            setPlayTimer(false)
            reducer(defaultTime)
            if (moodPomodoro === "shortRest" || moodPomodoro === "longRest") {
                setPomodoroSeries(pomodoroSeries-1); 
            }
        }
    }

}

function PomodoroClock() {

    const { 
        focusTime, 
        setFocusTime,

        defaultFocusTime,
    
        shortRestTime, 
        setShortRestTime,
    
        longRestTime, 
        setLongRestTime,

        shortRestDefaultTime,
        longRestDefaultTime,

        pomodoroSeries,
        setPomodoroSeries,

        playTimer, 
        setPlayTimer,

        typePomodoro, 
        setTypePomodoro,
        // playTimer
    } = React.useContext(PomodoroContext); 

    const moodAndTimePomodoroObject = functionDefineTime(focusTime, shortRestTime, longRestTime, pomodoroSeries, typePomodoro);

    
    let moodPomodoro = moodAndTimePomodoroObject.mood,
        timeDefinided = moodAndTimePomodoroObject.time;

    const { minute, second } = numberToTime(timeDefinided);

    

    let setTime = null;
    let defaultTime = null;
    
    
    switch (moodPomodoro) {
        case "focus":
            setTime = setFocusTime;
            defaultTime = defaultFocusTime;
            break;
        case "shortRest": 
            setTime = setShortRestTime;
            defaultTime = shortRestDefaultTime;
            break;
          
        case "longRest": 
            setTime = setLongRestTime;
            defaultTime = longRestDefaultTime;
            break; 
      }
    
    

    const onPlayer = (onChange) => {
        const pomodoroPlayer = new PomodoroPlayer( playTimer, setPlayTimer, setTime, typePomodoro, setTypePomodoro, setPomodoroSeries, pomodoroSeries );
        pomodoroPlayer[onChange]();
        if (onChange === "onStop") setTime(defaultTime)
    }

    const reducerClock = functionReducerClock(typePomodoro, setTypePomodoro, setPlayTimer, pomodoroSeries, setPomodoroSeries, setTime, defaultTime, moodPomodoro);

    React.useEffect(() => {
        let timer = null;
        
        if (playTimer) {
            
            timer = setInterval(() => {
                timeDefinided -= 1;
                reducerClock(timer, timeDefinided);     
                
            }, 1000);
        }

        else if(!playTimer) {
            clearInterval(timer);
        }

        return () => {clearInterval(timer)};
    },[playTimer, typePomodoro]);

    return (
        <PomodoroClockUI
        minute={minute}
        second={second}
        onPlayer={onPlayer}
        playTimer={playTimer}/>
    );
}

export {PomodoroClock};