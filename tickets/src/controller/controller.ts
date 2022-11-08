import { RequestHandler } from 'express';

export const testMe: RequestHandler = async (req, res, next) => {
  res.status(200).send({});
};
