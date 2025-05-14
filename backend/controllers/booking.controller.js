import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const createBooking = catchAsync(async (req, res, next) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  // Check if event has available tickets
  if (event.availableTickets <= 0) {
    return next(new AppError('No available tickets for this event', 400));
  }

  // Check if user already booked this event
  const existingBooking = await Booking.findOne({
    user: req.user.id,
    event: eventId
  });

  if (existingBooking) {
    return next(new AppError('You have already booked this event', 400));
  }

  // Create booking
  const booking = await Booking.create({
    event: eventId,
    user: req.user.id,
    price: event.price
  });

  // Decrease available tickets
  event.availableTickets -= 1;
  await event.save();

  res.status(201).json({
    status: 'success',
    data: {
      booking
    }
  });
});


export const getUserBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('event');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});

export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find().populate('event user');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});

export const deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  // Increase available tickets before deleting booking
  const event = await Event.findById(booking.event);
  if (event) {
    event.availableTickets += 1;
    await event.save();
  }

  await Booking.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
