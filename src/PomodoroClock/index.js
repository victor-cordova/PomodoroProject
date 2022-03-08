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

function toTime(number) {

    if (0 < number && number < 3660) {
        const minute = Math.floor(number/60);
        const second = number - minute * 60;

        return {minute: minute, second: second};
    }
    return {minute: 0, second: 0};
}

function defineRestAndFocusTime (defaultTimes, typePomodoro) {
    const focusTimes = defaultTimes[0],
        restTimes = defaultTimes[1];

    if(typePomodoro) {
        return  {time: focusTimes[1], mood: focusTimes[0], againstMood: restTimes[0]};
    }
    return  {time: restTimes[1], mood: restTimes[0], againstMood: focusTimes[0]};
}


function returnCurrentTimeAndMood (PomodoroDefaultTime, pomodoroSeries, typePomodoro) {
    let defaultTimes = Object.entries(PomodoroDefaultTime);
    
    if (pomodoroSeries > 0) {
        defaultTimes.splice(2, 2);
        
        const TimeAndMoodDefinided = defineRestAndFocusTime(defaultTimes, typePomodoro)
        
        return TimeAndMoodDefinided;
    }
    defaultTimes.splice(1, 1);
    const TimeAndMoodDefinided = defineRestAndFocusTime(defaultTimes, typePomodoro)
    
    return TimeAndMoodDefinided;
}




function reduceClock(typePomodoro, setTypePomodoro, setPlayTimer, pomodoroSeries, setPomodoroSeries, setPomodoroTime, PomodoroDefaultTime, currentAgainstMoodPomodoro) { 

    return function (timer, currentTimePomodoro) {
        
        setPomodoroTime(currentTimePomodoro);
        if (currentTimePomodoro < 0) {

            clearInterval(timer);
            setTypePomodoro(!typePomodoro);    
            setPlayTimer(false);

            setPomodoroTime(PomodoroDefaultTime[currentAgainstMoodPomodoro]); 

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

        setMoodPomodoro,

        PomodoroDefaultTime, 

        pomodoroTime, 
        setPomodoroTime,
    } = React.useContext(PomodoroContext); 

    const CurrentMoodAndTimePomodoro = returnCurrentTimeAndMood(PomodoroDefaultTime, pomodoroSeries, typePomodoro);

    let currentMoodPomodoro = CurrentMoodAndTimePomodoro.mood, 
        currentAgainstMoodPomodoro = CurrentMoodAndTimePomodoro.againstMood; 
    
    

    let currentTimePomodoro = null;
    if (pomodoroTime < 0) {
        currentTimePomodoro = CurrentMoodAndTimePomodoro.time;
    } else {
        currentTimePomodoro = pomodoroTime;
    }

    const { minute, second } = toTime(pomodoroTime);

    const onPlayer = (onChange) => {
        const pomodoroPlayer = new PomodoroPlayer( playTimer, setPlayTimer, setPomodoroTime, typePomodoro, setTypePomodoro, setPomodoroSeries, pomodoroSeries );
        pomodoroPlayer[onChange]();
    }

    React.useEffect(() => {
        let timer = null;

        setMoodPomodoro(currentMoodPomodoro); 

        const reducerClock = reduceClock(typePomodoro, setTypePomodoro, setPlayTimer, pomodoroSeries, setPomodoroSeries, setPomodoroTime, PomodoroDefaultTime, currentAgainstMoodPomodoro); 

        setPomodoroTime(currentTimePomodoro)      
        if (playTimer) {
            timer = setInterval(() => {

                currentTimePomodoro -= 1;
                reducerClock(timer, currentTimePomodoro);    
            }, 1000);
        } else if(!playTimer) {
            clearInterval(timer);
        }
        return () => {clearInterval(timer)};
    },[playTimer, typePomodoro, PomodoroDefaultTime]);

    return (
        <PomodoroClockUI
        minute={minute}
        second={second}
        onPlayer={onPlayer}
        playTimer={playTimer}/>
    );
}

export {PomodoroClock};