import { RequestHandler } from 'express';

export const testMe: RequestHandler = async (req, res, next) => {
  console.log('inside tickets!');

  res.status(200).send({});
};
