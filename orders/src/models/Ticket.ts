// NOTICE: This is NOT code duplication from the tickets service.
// Keepm in mind that thie model and its credentials are relevent only for order service
import { Schema, model, Model, Document, ObjectId } from 'mongoose';
import { Order } from './Order';
import { OrderStatus } from '@adar-tickets/common';

interface TicketCredentials {
  title: string;
  price: number;
}

interface TicketModel extends Model<TicketDoc> {
  build(credentials: TicketCredentials): TicketDoc;
}

// NOTICE: 'build' is a method that we set on the Model itself
// 'isReserved' on the other hand is a method that we set on evrey instance
export interface TicketDoc extends Document {
  _id: ObjectId;
  title: string;
  price: number;
  isReserved(): Promise<Boolean>;
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(roc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ticketSchema.statics.build = (credentials: TicketCredentials) =>
  new Ticket(credentials);

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [OrderStatus.CREATED, OrderStatus.PENDING, OrderStatus.COMPLETED],
    },
  });

  // Just an alegant way to return true/false according to the result of the serach
  return !!existingOrder;
};

export const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema);
