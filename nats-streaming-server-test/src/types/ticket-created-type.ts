import { Channels } from './channel-types';

export interface TicketCreatedEventType {
  channel: Channels.TICKET_CREATED;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
