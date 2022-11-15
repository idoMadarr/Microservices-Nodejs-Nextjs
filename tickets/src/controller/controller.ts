import { RequestHandler } from 'express';
import { Ticket } from '../models/Ticket';
import { NotFoundError, UnauthorizedError } from '@adar-tickets/common';

export const createTicket: RequestHandler = async (req, res, next) => {
  const { title, price } = req.body;
  const createTicket = Ticket.build({
    title,
    price,
    userId: req.currentUser?.id!,
  });
  await createTicket.save();
  res.status(200).send(createTicket);
};

export const getTicket: RequestHandler = async (req, res, next) => {
  const { ticketId } = req.params;

  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(200).send(ticket);
};

export const getTickets: RequestHandler = async (req, res, next) => {
  const tickets = await Ticket.find({});

  res.status(200).send(tickets);
};

export const updateTicket: RequestHandler = async (req, res, next) => {
  const { title, price } = req.body;
  const { ticketId } = req.params;

  const existTicket = await Ticket.findById(ticketId);

  if (!existTicket) {
    throw new NotFoundError();
  }

  if (existTicket.userId !== req.currentUser?.id!) {
    throw new UnauthorizedError();
  }

  existTicket.set({ title, price });
  await existTicket.save();

  res.status(200).send(existTicket);
};
