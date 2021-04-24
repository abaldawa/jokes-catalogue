/**
 * User: abhijit.baldawa
 *
 * This module initializes all the pre-requisites and then starts the express server
 */

import express from 'express';
import path from 'path';
import { getPort } from './config';
import jokeRouter from './routes/joke.routes';
import logger from './logger';

/**
 * @public
 *
 * Method which does all the standard server startup routine.
 */
const start = async (): Promise<void> => {
  try {
    const app = express();
    const PORT = getPort();

    // Add routes
    app.use('/joke', jokeRouter);

    // Serve client
    app.use(
      express.static(path.join(__dirname, '..', '..', 'client', 'build'))
    );

    // Start HTTP server
    await new Promise<void>((resolve, reject) =>
      app.listen(PORT, resolve).on('error', reject)
    );
    logger.info(`Server is listening on port = ${PORT}`);
  } catch (err: unknown) {
    logger.error(
      `Error while starting server. Error: ${(err as Error).stack}. Exiting...`
    );
  }
};

if (require.main === module) {
  start();
}

export { start };
