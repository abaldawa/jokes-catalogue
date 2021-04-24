/**
 * User: abhijit.baldawa
 *
 * This module contains all the routes for '/joke' endpoint
 */

import { Router } from 'express';
import { getJokes } from '../controllers/joke.controller';

const router = Router();

router.get('/', getJokes);

export default router;
