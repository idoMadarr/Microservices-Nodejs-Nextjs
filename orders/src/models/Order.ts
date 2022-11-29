import { Schema, model, Model, Document, ObjectId } from 'mongoose';

interface OrderCredentials {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: any;
}

interface OrderModel extends Model<OrderDoc> {
  build(credentials: OrderCredentials): OrderDoc;
}

interface OrderDoc extends Document {
  _id: ObjectId;
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: any;
}

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Schema.Types.Date,
      required: false,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

orderSchema.statics.build = (credentials: OrderCredentials) =>
  new Order(credentials);

export const Order = model<OrderDoc, OrderModel>('Order', orderSchema);
