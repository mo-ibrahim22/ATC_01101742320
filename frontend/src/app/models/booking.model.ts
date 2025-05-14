import { Event } from './event.model';
import { User } from './user.model';

export interface Booking {
  _id: string;
  event: Event;
  user: User;
  price: number;
  createdAt: Date;
  paid: boolean;
}
