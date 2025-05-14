import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      required: [true, 'Booking must belong to an Event!']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a User!']
    },
    price: {
      type: Number,
      required: [true, 'Booking must have a price.']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    paid: {
      type: Boolean,
      default: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'event',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;