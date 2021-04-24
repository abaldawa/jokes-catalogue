import React from "react";
import classes from "./Joke.module.css";
import type { JokeObject } from "../../serverApi/joke";

interface JokeProps extends JokeObject {
  children?: never;
}

const Joke: React.FC<JokeProps> = (props) => {
  const { title, text, tag } = props;

  return (
    <div className={classes.joke}>
        <p>
            <b>Title: </b>
            <span dangerouslySetInnerHTML={ {__html: title.replace(/a/gi, '<b>$&</b>')} }/>
        </p>
        <p>
            <b>Text: </b>
            <span dangerouslySetInnerHTML={ {__html: text.replace(/a/gi, '<b>$&</b>')} }/>
        </p>
        <div className={classes["tag-container"]}>
            <b>Tags:</b>
            [ <span className={classes["tag-container__elem"]}>{tag.join(", ")}</span> ]
        </div>
    </div>
  );
};

export { Joke };
