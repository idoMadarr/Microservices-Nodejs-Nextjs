import { Publisher } from './custom-publisher';
import { TicketCreatedEventType } from '../types/ticket-created-type';
import { Channels } from '../types/channel-types';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEventType> {
  channel: TicketCreatedEventType['channel'] = Channels.TICKET_CREATED;
}
