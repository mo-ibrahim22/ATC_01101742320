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

  // Check if user already booked this event
  const existingBooking = await Booking.findOne({
    user: req.user.id,
    event: eventId
  });

  if (existingBooking) {
    return next(new AppError('You have already booked this event', 400));
  }

  const booking = await Booking.create({
    event: eventId,
    user: req.user.id,
    price: event.price
  });

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
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});