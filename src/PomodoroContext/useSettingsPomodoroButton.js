import React from "react";

function useSettingsPomodoroButton () {
    const [settingButtonActivated, setSettingButtonActivated] = React.useState(false);


    return {
        settingButtonActivated, 
        setSettingButtonActivated
    };
}

export {useSettingsPomodoroButton};