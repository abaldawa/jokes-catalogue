import React from "react";
import classes from "./JokesList.module.css";
import { Joke } from "../Joke/Joke";
import type { Joke as JokeType } from "../../serverApi/joke";

interface JokesListProps {
  jokes?: JokeType["jokes"];
  children?: never;
}

const JokesList: React.FC<JokesListProps> = (props) => {
  const { jokes } = props;

  return jokes ? (
    <div className={classes["jokes-list"]}>
      {jokes.map((jokeObj) => (
        <Joke key={jokeObj.id} {...jokeObj} />
      ))}
    </div>
  ) : null;
};

export { JokesList };
