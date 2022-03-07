import React from "react";

import { useSettingsPomodoroButton } from "./useSettingsPomodoroButton";
import { usePomodoroPlayer } from "./usePomodoroPlayer";
import { usePomodoroType } from "./usePomodoroType";
import { usePomodoroSeries } from "./usePomodoroSeries";
import { usePomodoroDefaultTime } from "./usePomodoroDefaultTime";
import { usePomodoroTime } from "./usePomodoroTime";

const PomodoroContext = React.createContext();

function PomodoroProvider(props) {

  const LOCAL_STORAGE_POMODORO = {
    time: "LOCAL_STORAGE_POMODORO_TIME_V2",
    series: "LOCAL_STORAGE_POMODORO_SERIES_V2",
  };
  
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
    setTypePomodoro,

    moodPomodoro, 
    setMoodPomodoro,
  } = usePomodoroType();

  const {
    pomodoroSeries, 
    setPomodoroSeries
  } = usePomodoroSeries(LOCAL_STORAGE_POMODORO.series, settingButtonActivated);  

  const {
    PomodoroDefaultTime, 
    setPomodoroDefaultTime
  } = usePomodoroDefaultTime(LOCAL_STORAGE_POMODORO.time, settingButtonActivated);

  const {
    pomodoroTime, 
    setPomodoroTime,
  } = usePomodoroTime(LOCAL_STORAGE_POMODORO.time, PomodoroDefaultTime);

  return (
      <PomodoroContext.Provider value={{
        LOCAL_STORAGE_POMODORO,

        settingButtonActivated,
        setSettingButtonActivated,
    
        playTimer, 
        setPlayTimer,
    
        typePomodoro, 
        setTypePomodoro,

        moodPomodoro, 
        setMoodPomodoro,

        pomodoroSeries, 
        setPomodoroSeries,

        PomodoroDefaultTime, 
        setPomodoroDefaultTime,

        pomodoroTime, 
        setPomodoroTime,
      }}> 
        {props.children}
      </PomodoroContext.Provider> 
  ); //Dentro de este componente se colocarán Pomodoros estados 
}

export { PomodoroContext, PomodoroProvider };