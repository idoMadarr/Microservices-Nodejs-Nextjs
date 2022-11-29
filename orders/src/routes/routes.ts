import { Router } from 'express';
import { body } from 'express-validator';
import {
  validationMiddleware,
  authMiddleware,
  currentUserMiddleware,
} from '@adar-tickets/common';
import {
  createOrder,
  getOrder,
  getOrders,
  deleteOrder,
} from '../controller/controller';

const route = Router();

// https://ticketing.dev/api/orders/create-order
route.post(
  '/create-order',
  [
    currentUserMiddleware,
    authMiddleware,
    body('ticketId').notEmpty().withMessage('Ticket ID is required'),
    validationMiddleware,
  ],
  createOrder
);

// https://ticketing.dev/api/orders/:orderId
route.get('/:orderId', getOrder);

// https://ticketing.dev/api/orders
route.get('/', getOrders);

// https://ticketing.dev/api/orders/delete-order/:orderId
route.delete('/delete-order/:orderId', deleteOrder);

export { route as ordersRoutes };
