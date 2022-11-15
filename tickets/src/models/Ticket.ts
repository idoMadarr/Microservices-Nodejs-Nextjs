import { Schema, model, Model, Document, ObjectId } from 'mongoose';

interface TicketCredentials {
  title: string;
  price: string;
  userId: string;
}

interface TicketModel extends Model<TicketDoc> {
  build(credentials: TicketCredentials): TicketDoc;
}

interface TicketDoc extends Document {
  _id: ObjectId;
  title: string;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
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
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ticketSchema.statics.build = (credentials: TicketCredentials) =>
  new Ticket(credentials);

export const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema);
