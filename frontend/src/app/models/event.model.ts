export interface Event {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  date: Date;
  venue: string;
  price: number;
  image: string;
  tags: string[];
  availableTickets: number;
  createdAt: Date;
  isBooked: boolean;
  bookingId: string;
}
