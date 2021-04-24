/**
 * User: abhijit.baldawa
 *
 * joke service module
 */

import axios from 'axios';
import {
  getRandomUniqueIds,
  mostCommonItemInArray,
  totalOccurrenceOfItemInArray,
} from '../../utils';
import { getJokeApiDetails } from '../../config';
import type { Joke } from './types/joke';

const {
  jokeIdApiUrl,
  jokeIdPlaceholderInUrl,
  jokeIds,
  jokeApiHeaders,
} = getJokeApiDetails();

interface JokesWithMetrics {
  jokesMetrics: {
    mostCommonLetter: { item: string; count: number };
    totalTextLengthOfAllJokes: number;
    mostCommonTag: { item: string; count: number };
    firstLetterOfLastJokeDetails: { letter: string; totalCount: number };
  };
  jokes: Array<{ text: string; id: string; tag: string[]; title: string }>;
}

/**
 * @private
 *
 * For given jokes return interesting metrics
 *
 * @param jokes
 */
const getJokesMetrics = (jokes: Joke['contents']['jokes']) => {
  const invalidLetterRegex = /[^a-z]/gi;
  const arrOfTitleAndTextOfAllJokes = jokes.map(
    (joke) => joke.title.trim() + joke.text.trim()
  );
  const firstCharOfLastJoke = arrOfTitleAndTextOfAllJokes[
    arrOfTitleAndTextOfAllJokes.length - 1
  ].replace(invalidLetterRegex, '')[0];
  const titleAndTextOfAllJokes = arrOfTitleAndTextOfAllJokes.join('');
  const totalTextLengthOfAllJokes = titleAndTextOfAllJokes.length;
  const arrayOfLettersOfAllJokes = titleAndTextOfAllJokes
    .replace(invalidLetterRegex, '')
    .toLowerCase()
    .split('');

  const firstLetterOfLastJokeDetails = {
    letter: firstCharOfLastJoke,
    totalCount: totalOccurrenceOfItemInArray(
      firstCharOfLastJoke.toLowerCase(),
      arrayOfLettersOfAllJokes
    ),
  };
  const mostCommonLetter = mostCommonItemInArray(arrayOfLettersOfAllJokes);
  const mostCommonTag = mostCommonItemInArray(
    jokes.flatMap((joke) => joke.tags)
  );

  return {
    totalTextLengthOfAllJokes,
    firstLetterOfLastJokeDetails,
    mostCommonLetter,
    mostCommonTag,
  };
};

/**
 * @public
 *
 * Given 'noOfJokes' param returns those many number of
 * joke from joke third party service
 *
 * @param noOfJokes - number of joke to return
 */
const getJokes = async (noOfJokes: number): Promise<JokesWithMetrics> => {
  if (noOfJokes > jokeIds.length) {
    throw new Error(
      `The maximum number of jokes allowed to fetch are = ${jokeIds.length}`
    );
  }

  let jokesIdsToQuery: string[] = jokeIds;

  if (noOfJokes < jokeIds.length) {
    jokesIdsToQuery = getRandomUniqueIds(
      jokeIds,
      0,
      jokeIds.length - 1,
      noOfJokes
    );
  }

  try {
    const jokeObjArr = await Promise.all(
      jokesIdsToQuery.map(async (jokeId) => {
        const response = await axios.get<Joke>(
          jokeIdApiUrl.replace(jokeIdPlaceholderInUrl, jokeId),
          {
            headers: jokeApiHeaders,
          }
        );

        return response.data;
      })
    );
    const jokes = jokeObjArr.flatMap((joke) => joke.contents.jokes);
    const jokesMetrics = getJokesMetrics(jokes);

    return {
      jokesMetrics,
      jokes: jokes.map((joke) => ({
        title: joke.title,
        text: joke.text,
        id: joke.id,
        tag: joke.tags,
      })),
    };
  } catch (error: unknown) {
    throw new Error(`Error fetching jokes. Error=${error}`);
  }
};

export { getJokes, JokesWithMetrics };
