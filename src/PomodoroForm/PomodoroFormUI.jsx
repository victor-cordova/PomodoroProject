import React from "react";

import "./PomodoroForm.css";
import "./../styles/button.css";

function PomodoroFormUI (props) {
    return (
        <section className="form">
            <div className="form__container">
                <h2 className="form__text form__text--title">Settings</h2>

                <form 
                action=""
                className="form__box-input"
                >
                    <label
                        className="form__text form__text--label"
                    >
                        Focus:
                    </label>

                    <input 
                        className="form__input"
                        type="number"
                        onChange={props.inputData}
                        onClick={() => props.typeInput("focusTime")}

                    />
                    

                    <label
                        className="form__text form__text--label"
                    >
                        ShortRest:
                    </label>

                    <input 
                        className="form__input"
                        type="number"
                        onChange={props.inputData}
                        onClick={() => props.typeInput("shortRestTime")}
                    />
                    

                    <label
                        className="form__text form__text--label"
                    >
                        LongRest:
                    </label>

                    <input 
                        className="form__input"
                        type="number"
                        onChange={props.inputData}
                        onClick={() => props.typeInput("longRestTime")}
                    />

                    <label
                        className="form__text form__text--label"
                    >
                        Series:
                    </label>

                    <input 
                        className="form__input"
                        type="number"
                        onChange={props.inputData}
                        onClick={() => props.typeInput("series")}

                    />    

                </form>

                <div 
                    className="form__button-container"
                >
                    <input
                        type="button"
                        className="button button__cancel"
                        onClick={props.onClose}
                    />
                    
                    <input
                        type="button"
                        className="button button__save"
                        onClick={props.onSave}
                    /> 
                </div>

            </div>
        </section>
    );
}

export {PomodoroFormUI};