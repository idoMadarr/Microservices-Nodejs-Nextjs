import { Router } from 'express';
import { body } from 'express-validator';
import { validationMiddleware, authMiddleware } from '@adar-tickets/common';
import { testMe } from '../controller/controller';
const route = Router();

// https://ticketing.dev/api/trade/tickets
route.post('/tickets', testMe);

export { route as ticketsRoutes };
