import React, {useState} from "react";
import {getJokes, Joke as JokeType} from "../../serverApi/joke";
import {JokesSelection} from "../../Components/JokesSelection/JokesSelection";
import {JokesList} from "../../Components/JokesList/JokesList";
import classes from "./Joke.module.css";
import {JokesMetrics} from "../../Components/JokesMetrics/JokesMetrics";
import {Loader} from "../../Components/UI/Loader/Loader";

const noOfJokesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const Joke: React.FC = () => {
    const [noOfJokes, setNoOfJokes] = useState(0);
    const [joke, setJoke] = useState<JokeType>();
    const [loading, setLoading] = useState(false);

    const handleJokesFetch = async () => {
        setLoading(true);
        try {
            setJoke(await getJokes(noOfJokes));
        } catch(error: unknown) {
            alert(error);
        }
        setLoading(false);
    };

    return (
        <>
            <Loader loading={loading} color={'#3e4a43'}/>
            <div className={classes["joke-container"]}>
                <JokesSelection
                    disabled={loading}
                    onJokesSelection={setNoOfJokes}
                    noOfJokesArr={noOfJokesArr}
                    selectedNoOfJokes={noOfJokes}
                    onJokesFetch={handleJokesFetch}
                />
                <JokesList jokes={joke?.jokes}/>
                <JokesMetrics jokesMetrics={joke?.jokesMetrics}/>
            </div>
        </>
    );
};

export { Joke };