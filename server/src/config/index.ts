/**
 * User: abhijit.baldawa
 *
 * This module exposes methods to fetch environment variables
 */

import 'dotenv/config';

interface EnvironmentVariables extends NodeJS.ProcessEnv {
  PORT?: string;
  JOKE_ID_API_URL?: string;
  JOKE_ID_PLACEHOLDER_IN_URL?: string;
  JOKE_API_HEADERS?: string; // This should be a valid JSON string
  JOKE_IDS?: string; // This should be a valid JSON array of strings
}

const env = process.env as EnvironmentVariables;

/**
 * @public
 *
 * Get port from environment variable or else default to 3000
 * This method returns the port number on which the server should run
 */
const getPort = (): number => (env.PORT ? +env.PORT : 3000);

const getJokeApiDetails = () => {
  const {
    JOKE_ID_API_URL,
    JOKE_API_HEADERS,
    JOKE_ID_PLACEHOLDER_IN_URL,
    JOKE_IDS,
  } = env;
  let jokeApiHeaders: Record<string, string>;
  let jokeIds: string[];

  if (!JOKE_ID_API_URL) {
    throw new Error(`'JOKE_ID_API_URL' environment variable is required`);
  }

  if (!JOKE_API_HEADERS) {
    throw new Error(`'JOKE_API_HEADERS' environment variable is required`);
  }

  if (!JOKE_ID_PLACEHOLDER_IN_URL) {
    throw new Error(
      `'JOKE_ID_PLACEHOLDER_IN_URL' environment variable is required`
    );
  }

  if (!JOKE_IDS) {
    throw new Error(`'JOKE_IDS' environment variable is required`);
  }

  if (!JOKE_ID_API_URL.includes(JOKE_ID_PLACEHOLDER_IN_URL)) {
    throw new Error(
      `'JOKE_ID_API_URL' environment variable must include placeholder '${JOKE_ID_PLACEHOLDER_IN_URL}'\
       so that it can be replaced with the right joke id key when making call`
    );
  }

  try {
    jokeApiHeaders = JSON.parse(JOKE_API_HEADERS);
  } catch (error: unknown) {
    throw new Error(
      `'JOKE_API_HEADERS' must be a valid JSON string. Error=${error}`
    );
  }

  try {
    jokeIds = JSON.parse(JOKE_IDS);
  } catch (error: unknown) {
    throw new Error(
      `'JOKE_IDS' must be a valid JSON array of string. Error=${error}`
    );
  }

  if (!Array.isArray(jokeIds) || !jokeIds.length) {
    throw new Error(
      `'JOKE_IDS' must be a valid JSON array of string and must not be empty`
    );
  }

  for (const [header, value] of Object.entries(jokeApiHeaders)) {
    if (!value) {
      throw new Error(
        `'JOKE_API_HEADERS' environment variable key '${header}' value must be set`
      );
    }
  }

  return {
    jokeIdApiUrl: JOKE_ID_API_URL,
    jokeIdPlaceholderInUrl: JOKE_ID_PLACEHOLDER_IN_URL,
    jokeApiHeaders,
    jokeIds,
  };
};

export { getPort, getJokeApiDetails };
