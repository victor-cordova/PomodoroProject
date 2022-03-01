import React from "react";

function usePomodoroForm () {
    const [inputType, setInputType] = React.useState("");

    return {
        inputType,
        setInputType
    }
}

export {usePomodoroForm};