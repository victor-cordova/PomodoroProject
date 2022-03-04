import React from "react";
import "./PomodoroClock.css";
import { PomodoroContext } from "../PomodoroContext";
import { PomodoroClockUI } from "./PomodoroClockUI";

class PomodoroPlayer {
    constructor( playTimer, setPlayTimer, setPomodoroTime, typePomodoro, setTypePomodoro, setPomodoroSeries, pomodoroSeries ) {
        this.playTimer = playTimer;
        this.setPlayTimer = setPlayTimer;
        this.setPomodoroTime = setPomodoroTime;
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
        this.setPomodoroTime(-1);
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

function defineRestAndFocusTime (time, typePomodoro) {
    const focusTime = time[0],
        restTime = time[1];
    if(typePomodoro) {
        return  {time: focusTime[1], mood: focusTime[0], againstMood: restTime[0]};
    }
    return  {time: restTime[1], mood: restTime[0], againstMood: focusTime[0]};
}


function functionDefineTime (pomodoroDefaultTime, pomodoroSeries, typePomodoro) {
    let defaultTimeArray = Object.entries(pomodoroDefaultTime);
    
    if (pomodoroSeries > 0) {
        defaultTimeArray.splice(2, 2);
        
        const timeDefinidedAndMood = defineRestAndFocusTime(defaultTimeArray, typePomodoro)
        
        return timeDefinidedAndMood;
    }
    defaultTimeArray.splice(1, 1);
    const timeDefinidedAndMood = defineRestAndFocusTime(defaultTimeArray, typePomodoro)
    
    return timeDefinidedAndMood;
}




function functionReducerClock(typePomodoro, setTypePomodoro, setPlayTimer, pomodoroSeries, setPomodoroSeries, setPomodoroTime, pomodoroDefaultTime, moodPomodoroActual, againstMoodPomodoroActual) {

    return function (timer, timeDefinided) {
        
        setPomodoroTime(timeDefinided);
        if (timeDefinided < 0) {

            clearInterval(timer);
            setTypePomodoro(!typePomodoro);    
            setPlayTimer(false);

            setPomodoroTime(pomodoroDefaultTime[againstMoodPomodoroActual]);

            if (typePomodoro) {
                setPomodoroSeries(pomodoroSeries-1); 
            }
        }
    }

}

function PomodoroClock() {

    const { 
        pomodoroSeries,
        setPomodoroSeries,

        playTimer, 
        setPlayTimer,

        typePomodoro, 
        setTypePomodoro,

        moodPomodoro, 
        setMoodPomodoro,

        pomodoroDefaultTime, 
        setPomodoroDefaultTime,

        pomodoroTime, 
        setPomodoroTime,
        // playTimer
    } = React.useContext(PomodoroContext); 

    const moodAndTimePomodoroObject = functionDefineTime(pomodoroDefaultTime, pomodoroSeries, typePomodoro);

    let moodPomodoroActual = moodAndTimePomodoroObject.mood,
        againstMoodPomodoroActual = moodAndTimePomodoroObject.againstMood;
    
    

    let timeDefinided = null;
    if (pomodoroTime < 0) {
        timeDefinided = moodAndTimePomodoroObject.time;
    }
    else {
        timeDefinided = pomodoroTime;
    }

    const { minute, second } = numberToTime(pomodoroTime);

    const onPlayer = (onChange) => {
        const pomodoroPlayer = new PomodoroPlayer( playTimer, setPlayTimer, setPomodoroTime, typePomodoro, setTypePomodoro, setPomodoroSeries, pomodoroSeries );
        pomodoroPlayer[onChange]();
    }

    React.useEffect(() => {
        let timer = null;

        setMoodPomodoro(moodPomodoroActual);
        

        const reducerClock = functionReducerClock(typePomodoro, setTypePomodoro, setPlayTimer, pomodoroSeries, setPomodoroSeries, setPomodoroTime, pomodoroDefaultTime, moodPomodoroActual, againstMoodPomodoroActual);

        setPomodoroTime(timeDefinided)      
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
    },[playTimer, typePomodoro, pomodoroDefaultTime]);

    return (
        <PomodoroClockUI
        minute={minute}
        second={second}
        onPlayer={onPlayer}
        playTimer={playTimer}/>
    );
}

export {PomodoroClock};