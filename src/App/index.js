import './App.css';

import { AppUI } from "./AppUI";
import { PomodoroProvider } from "../PomodoroContext";

function App() {
  return (
    <PomodoroProvider>
      <AppUI/>
    </PomodoroProvider>
  );
}

export {App};
