const JOKES_URL = "/joke";

interface JokeObject {
  text: string;
  id: string;
  tag: string[];
  title: string;
}

interface Joke {
  jokesMetrics: {
    mostCommonLetter: { item: string; count: number };
    totalTextLengthOfAllJokes: number;
    mostCommonTag: {item: string; count: number};
    firstLetterOfLastJokeDetails: {letter: string; totalCount: number};
  };
  jokes: JokeObject[]
}

const getJokes = async (noOfJokesToFetch: number): Promise<Joke> => {
  const res = await fetch(`${JOKES_URL}?noOfJokes=${noOfJokesToFetch}`);
  return res.json();
};

export { getJokes };
export type { Joke, JokeObject };

