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

// function defineRestAndFocusTime (restTime, focusTime, typePomodoro, restType) {
//     if(typePomodoro) {
        
//         return  {time: focusTime, mood: "focus"};
//     }
//     return  {time: restTime, mood: restType};
// }

function defineRestAndFocusTime (time, typePomodoro) {
    const focusTime = time[0],
        restTime = time[1];
    if(typePomodoro) {
        // console.log(focusTime);
        return  {time: focusTime[1], mood: focusTime[0]};
    }
    return  {time: restTime[1], mood: restTime[0]};
}


// function functionDefineTime (focusTime, shortRestTime, longRestTime, pomodoroSeries, typePomodoro) {
//     if (pomodoroSeries > 0) {
//         const timeDefinidedAndMood = defineRestAndFocusTime(shortRestTime, focusTime, typePomodoro, "shortRest")
        
//         return timeDefinidedAndMood;
//     }
//     const timeDefinidedAndMood = defineRestAndFocusTime(longRestTime, focusTime, typePomodoro, "longRest")
    
//     return timeDefinidedAndMood;
// }

function functionDefineTime (pomodoroDefaultTime, pomodoroSeries, typePomodoro) {
    // console.log(pomodoroDefaultTime);
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


// (typePomodoro, setTypePomodoro, setPlayTimer, pomodoroSeries, setPomodoroSeries, setPomodoroTime, pomodoroDefaultTime, moodPomodoro);

function functionReducerClock(typePomodoro, setTypePomodoro, setPlayTimer, pomodoroSeries, setPomodoroSeries, setPomodoroTime, pomodoroDefaultTime, moodPomodoro) {
    
    // let reducer;

    // reducer = setPomodoroTime;

    return function (timer, timeDefinided) {
        setPomodoroTime(timeDefinided);

        if (timeDefinided < 0) {
            clearInterval(timer);
            setTypePomodoro(!typePomodoro);    
            setPlayTimer(false)
            // console.log(pomodoroDefaultTime)
            // console.log(moodPomodoro)

            // setPomodoroTime(pomodoroDefaultTime)
            if (moodPomodoro === "shortRest" || moodPomodoro === "longRest") {
                setPomodoroSeries(pomodoroSeries-1); 
            }
        }
    }

}

function PomodoroClock() {

    const { 
        // focusTime, 
        // setFocusTime,

        // defaultFocusTime,
    
        // shortRestTime, 
        // setShortRestTime,
    
        // longRestTime, 
        // setLongRestTime,

        // shortRestDefaultTime,
        // longRestDefaultTime,

        pomodoroSeries,
        setPomodoroSeries,

        playTimer, 
        setPlayTimer,

        typePomodoro, 
        setTypePomodoro,

        pomodoroDefaultTime, 
        setPomodoroDefaultTime,

        pomodoroTime, 
        setPomodoroTime,
        // playTimer
    } = React.useContext(PomodoroContext); 

    // const moodAndTimePomodoroObject = functionDefineTime(focusTime, shortRestTime, longRestTime, pomodoroSeries, typePomodoro);

    // console.log(pomodoroDefaultTime);
    const moodAndTimePomodoroObject = functionDefineTime(pomodoroDefaultTime, pomodoroSeries, typePomodoro);

    let moodPomodoro = moodAndTimePomodoroObject.mood,
        timeDefinided = moodAndTimePomodoroObject.time;

    // console.log(moodPomodoro);
    // console.log(pomodoroSeries);
    // setPomodoroTime(timeDefinided);
    // console.log(pomodoroTime)
    const { minute, second } = numberToTime(pomodoroTime);
    // let minute;
    // let second;

    // console.log(second)
    

    // let setTime = null;
    // let defaultTime = null;

    // switch (moodPomodoro) {
    //     case "focus":
    //         setTime = setFocusTime;
    //         defaultTime = defaultFocusTime;
    //         break;
    //     case "shortRest": 
    //         setTime = setShortRestTime;
    //         defaultTime = shortRestDefaultTime;
    //         break;
          
    //     case "longRest": 
    //         setTime = setLongRestTime;
    //         defaultTime = longRestDefaultTime;
    //         break; 
    //   }
    
    

    // const onPlayer = (onChange) => {
    //     const pomodoroPlayer = new PomodoroPlayer( playTimer, setPlayTimer, setTime, typePomodoro, setTypePomodoro, setPomodoroSeries, pomodoroSeries );
    //     pomodoroPlayer[onChange]();
    //     if (onChange === "onStop") setTime(defaultTime)
    // }

    const onPlayer = (onChange) => {
        const pomodoroPlayer = new PomodoroPlayer( playTimer, setPlayTimer, setPomodoroTime, typePomodoro, setTypePomodoro, setPomodoroSeries, pomodoroSeries );
        pomodoroPlayer[onChange]();
        // if (onChange === "onStop") setPomodoroTime(pomodoroDefaultTime[moodPomodoro])
    }

    const reducerClock = functionReducerClock(typePomodoro, setTypePomodoro, setPlayTimer, pomodoroSeries, setPomodoroSeries, setPomodoroTime, pomodoroDefaultTime, moodPomodoro);

    React.useEffect(() => {
        let timer = null;
        setPomodoroTime(timeDefinided)
        if (playTimer) {
            
            timer = setInterval(() => {
                
                timeDefinided -= 1;
                // {minute, second} = numberToTime(timeDefinided);
                // let timeDefinidedConverted = numberToTime(timeDefinided);
                // minute = timeDefinidedConverted.minute;
                // second = timeDefinidedConverted.second;
                // console.log(second);
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