import React from "react";

// import { usePomodoro } from "./useLocalStorage";
import { useSettingsPomodoroButton } from "./useSettingsPomodoroButton";
import { usePomodoroPlayer } from "./usePomodoroPlayer";
import { usePomodoroType } from "./usePomodoroType";
import { usePomodoroFocusTime } from "./usePomodoroFocusTime";
import { usePomodoroRestTime } from "./usePomodoroRestTime";
import { usePomodoroSeries } from "./usePomodoroSeries";
import { usePomodoroForm } from "./usePomodoroForm";
import { usePomodoroDefaultTime } from "./usePomodoroDefaultTime";
import { usePomodoroTime } from "./usePomodoroTime";

const PomodoroContext = React.createContext();

function PomodoroProvider(props) {

  const {
    settingButtonActivated,
    setSettingButtonActivated
  } = useSettingsPomodoroButton();

  const {
    playTimer, 
    setPlayTimer,
  } = usePomodoroPlayer();

  const {
    typePomodoro, 
    setTypePomodoro
  } = usePomodoroType();

  const {
    focusTime, 
    setFocusTime,

    defaultFocusTime
  } = usePomodoroFocusTime();

  const {
    shortRestTime, 
    setShortRestTime,

    longRestTime, 
    setLongRestTime,

    shortRestDefaultTime,
    longRestDefaultTime
  } = usePomodoroRestTime();

  const {
    pomodoroSeries, 
    setPomodoroSeries
  } = usePomodoroSeries();  

  const {
    inputType,
    setInputType
  } = usePomodoroForm();

  const {
    pomodoroDefaultTime, 
    setPomodoroDefaultTime
  } = usePomodoroDefaultTime("POMODORO_DEFAULT_TIME_V1");

  const {
    pomodoroTime, 
    setPomodoroTime,
  } = usePomodoroTime(pomodoroDefaultTime);

  return (
      <PomodoroContext.Provider value={{
        settingButtonActivated,
        setSettingButtonActivated,
    
        playTimer, 
        setPlayTimer,
    
        typePomodoro, 
        setTypePomodoro,
    
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

        inputType,
        setInputType,

        pomodoroDefaultTime, 
        setPomodoroDefaultTime,

        pomodoroTime, 
        setPomodoroTime,
      }}> 
        {props.children}
      </PomodoroContext.Provider> 
  ); //Dentro de este componente se colocarán Pomodoros estados 
}

export { PomodoroContext, PomodoroProvider };