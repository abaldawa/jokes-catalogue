import React from "react";
import classes from "./JokesSelection.module.css";

interface JokesSelectionProps {
    selectedNoOfJokes: number;
    noOfJokesArr: number[];
    disabled: boolean;
    children?: never;
    onJokesFetch(): void;
    onJokesSelection(noOfJokes: number): void;
}

const JokesSelection: React.FC<JokesSelectionProps> = (props) => {
    const {
        selectedNoOfJokes,
        onJokesSelection,
        noOfJokesArr,
        disabled,
        onJokesFetch
    } = props;
    const disableFetchButton = disabled || !selectedNoOfJokes;

    return (
        <div className={classes["joke-selection__container"]}>
            <label className={classes["margin-right--1rem"]}>
                Select number of jokes:
                <select
                    className={classes["margin-left--1rem"]}
                    disabled={disabled}
                    value={selectedNoOfJokes}
                    onChange={(event) => {
                        onJokesSelection(+event.target.value);
                    }}
                >
                    <option value="0">Select</option>
                    {noOfJokesArr.map((noOfJokes) => (
                        <option key={noOfJokes} value={noOfJokes}>
                            {noOfJokes}
                        </option>
                    ))}
                </select>
            </label>
            <button
                className={`
                    ${classes["fetch__button"]}
                    ${disableFetchButton ? classes["fetch__button--disabled"] : ""}
              ` }
                disabled={disableFetchButton}
                onClick={onJokesFetch}
            >
                Fetch
            </button>
        </div>
    );
};

export { JokesSelection };
