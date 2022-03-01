import React from "react";

function usePomodoroPlayer () {

    const [playTimer, setPlayTimer] = React.useState(false);
    

    return {
        playTimer, 
        setPlayTimer,
    }
}

export {usePomodoroPlayer};