import React from 'react';
import ReactDOM from 'react-dom';
import { PomodoroForm } from "../PomodoroForm"

function Modals () {

    return ReactDOM.createPortal(
        <PomodoroForm/>,   
        document.getElementById("modal")
    );
};

export {Modals};