import React from "react";
import {Joke} from "../../serverApi/joke";
import classes from "./JokesMetrics.module.css";

interface JokesMetricsProps {
    jokesMetrics?: Joke["jokesMetrics"];
    children?: never;
}

const JokesMetrics: React.FC<JokesMetricsProps> = (props) => {
    const {jokesMetrics} = props;

    return jokesMetrics ? (
        <div className={classes["joke-metrics-container"]}>
            <p className={classes["joke-metrics-container__heading"]}>Joke Metrics</p>
            <p>
                <b>Total text length of all jokes (title + text): </b>
                {jokesMetrics.totalTextLengthOfAllJokes}
            </p>
            <p>
                <b>First letter of the last joke: </b>
                '{
                    jokesMetrics.firstLetterOfLastJokeDetails.letter
                }' and it occurred <u>{
                    jokesMetrics.firstLetterOfLastJokeDetails.totalCount
                }</u> time(s) in all jokes (title + text)
            </p>
            <p>
                <b>Most common letter: </b>
                '{jokesMetrics.mostCommonLetter.item}' which appeared <u>{jokesMetrics.mostCommonLetter.count}</u> time(s)
            </p>
            <p>
                <b>Most frequent tag: </b>
                '{jokesMetrics.mostCommonTag.item}' which appeared <u>{jokesMetrics.mostCommonTag.count}</u> time(s)
            </p>
        </div>
    ): null;
};

export {JokesMetrics}