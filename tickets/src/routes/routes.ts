import { Router } from 'express';
import { body } from 'express-validator';
import {
  validationMiddleware,
  authMiddleware,
  currentUserMiddleware,
} from '@adar-tickets/common';
import { testMe } from '../controller/controller';
const route = Router();

// https://ticketing.dev/api/trade/tickets
route.post('/create-ticket', [currentUserMiddleware, authMiddleware], testMe);

export { route as ticketsRoutes };
