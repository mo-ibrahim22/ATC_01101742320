import Event from '../models/Event.js';
import Booking from '../models/Booking.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getAllEvents = catchAsync(async (req, res, next) => {
  // Set up API query features (filter, sort, limit, paginate)
  const features = new APIFeatures(Event.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const events = await features.query;

  if (req.user) {

    const bookings = await Booking.find({
      user: req.user.id,
      event: { $in: events.map(event => event._id) }
    });


    const eventsWithBookingStatus = events.map(event => {
      const isBooked = bookings.some(
        booking => booking.event._id.toString() === event._id.toString() // Adjusted comparison
      );
      let bookingId = null;
      if (isBooked) {
        const booking = bookings.find(
          booking => booking.event._id.toString() === event._id.toString()
        );
        bookingId = booking ? booking._id : null;
      }
      // Check if the booking ID exists for the event
      return {
        ...event.toObject(),
        isBooked,
        bookingId
      };
    });

    return res.status(200).json({
      status: 'success',
      results: eventsWithBookingStatus.length,
      data: {
        events: eventsWithBookingStatus
      }
    });
  }

  // If the user is not logged in, return the events without the isBooked field
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events
    }
  });
});



export const getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  let isBooked = false;
  let bookingId = null;

  if (req.user && req.user.id) {
    const booking = await Booking.findOne({
      user: req.user.id,
      event: req.params.id
    });

    if (booking) {
      isBooked = true;
      bookingId = booking._id;
    }
  }

  res.status(200).json({
    status: 'success',
    data: {
      event,
      isBooked,
      bookingId
    }
  });
});



export const createEvent = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    category,
    date,
    venue,
    price,
    tags,
    availableTickets
  } = req.body;

  const event = await Event.create({
    name,
    description,
    category,
    date,
    venue,
    price,
    tags,
    availableTickets,
    image: req.file ? req.file.path : undefined
  });

  res.status(201).json({
    status: 'success',
    data: {
      event
    }
  });
});

export const updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      ...(req.file && { image: req.file.path })
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      event
    }
  });
});

export const deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const getEventStats = catchAsync(async (req, res, next) => {
  const stats = await Event.aggregate([
    {
      $group: {
        _id: '$category',
        numEvents: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});