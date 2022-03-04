import React from "react";

import { useSettingsPomodoroButton } from "./useSettingsPomodoroButton";
import { usePomodoroPlayer } from "./usePomodoroPlayer";
import { usePomodoroType } from "./usePomodoroType";
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
    setTypePomodoro,

    moodPomodoro, 
    setMoodPomodoro,
  } = usePomodoroType();

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
  } = usePomodoroDefaultTime("POMODORO_DEFAULT_TIME_V1", settingButtonActivated);

  const {
    pomodoroTime, 
    setPomodoroTime,
  } = usePomodoroTime(pomodoroDefaultTime, "POMODORO_DEFAULT_TIME_V1");

  return (
      <PomodoroContext.Provider value={{
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