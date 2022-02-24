import React from "react";

// import { useToDos } from "./useLocalStorage";
import { usePomodoroClock } from "./usePomodoroClock";
import { useSettingsPomodoroButton } from "./useSettingsPomodoroButton";

const PomodoroContext = React.createContext();

function PomodoroProvider(props) {

  const {
    settingButtonActivated,
    setSettingButtonActivated
  } = useSettingsPomodoroButton();

  const { time,
    setTime,
    // shortRestTime,
    // setShortRestTime,
    PomodoroPlayer,
    minute,
    second,
    playTimer,
    setPlayTimer} = usePomodoroClock();

  const onPlayer = (onChange) => {
    const pomodoroPlayer = new PomodoroPlayer( playTimer, setPlayTimer, setTime );
    pomodoroPlayer[onChange]();
  }

  

  return (
      <PomodoroContext.Provider value={{

          time,
          setTime,
          minute,
          second,
          playTimer,
          setPlayTimer,

          onPlayer,
          // PomodoroPlayer,

          settingButtonActivated,
          setSettingButtonActivated
      }}> 
        {props.children}
      </PomodoroContext.Provider> 
  ); //Dentro de este componente se colocarán Pomodoros estados 
}

export { PomodoroContext, PomodoroProvider };