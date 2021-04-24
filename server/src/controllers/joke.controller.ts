/**
 * User: abhijit.baldawa
 *
 * This module exposes controller method's which are connected to /joke REST endpoint
 */

import { RequestHandler } from 'express';
import * as jokesService from '../services/joke/joke.service';

interface IGetJokesQueryParams {
  noOfJokes: string;
}

interface IErrorResponse {
  error: string;
}

/**
 * @public
 *
 * @RestEndPoint GET /joke?noOfJokes=<number>
 *
 * Responds with array of unique joke
 *
 * @param req
 * @param res
 */
const getJokes: RequestHandler<
  never,
  IErrorResponse | jokesService.JokesWithMetrics,
  never,
  IGetJokesQueryParams
> = async (req, res) => {
  try {
    const { noOfJokes } = req.query;

    if (!noOfJokes) {
      return res
        .status(400)
        .json({ error: `'noOfjokes' query param is required` });
    }

    const [noOfJokesNum] = [+noOfJokes];

    if (!Number.isInteger(noOfJokesNum)) {
      return res.status(400).json({
        error: `'noOfjokes' query param must be a valid number`,
      });
    }

    const jokesArr = await jokesService.getJokes(noOfJokesNum);
    return res.status(200).json(jokesArr);
  } catch (err: unknown) {
    return res.status(400).json({ error: (err as Error).message });
  }
};

export { getJokes };
