import { RequestHandler } from 'express';
import { Order } from '../models/Order';
import { NotFoundError, UnauthorizedError } from '@adar-tickets/common';
import { natsClient } from '../nats-wrapper/nats-client';

export const createOrder: RequestHandler = (req, res, next) => {
  res.send({});
};

export const getOrder: RequestHandler = (req, res, next) => {
  res.send({});
};

export const getOrders: RequestHandler = (req, res, next) => {
  res.send({});
};

export const deleteOrder: RequestHandler = (req, res, next) => {
  res.send({});
};
