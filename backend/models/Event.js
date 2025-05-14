import mongoose from 'mongoose';
import slugify from 'slugify';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An event must have a name'],
      unique: true,
      trim: true,
      maxlength: [100, 'An event name must have less or equal then 100 characters'],
      minlength: [10, 'An event name must have more or equal then 10 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'An event must have a description'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'An event must belong to a category'],
      enum: {
        values: ['music', 'sports', 'business', 'technology', 'arts', 'food', 'other'],
        message: 'Category is either: music, sports, business, technology, arts, food, other'
      }
    },
    date: {
      type: Date,
      required: [true, 'An event must have a date']
    },
    venue: {
      type: String,
      required: [true, 'An event must have a venue']
    },
    price: {
      type: Number,
      required: [true, 'An event must have a price']
    },
    image: {
      type: String,
      },
    tags: [String],
    availableTickets: {
      type: Number,
      required: [true, 'An event must have available tickets number']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

eventSchema.index({ price: 1 });
eventSchema.index({ slug: 1 });

eventSchema.virtual('bookings', {
  ref: 'Booking',
  foreignField: 'event',
  localField: '_id'
});

eventSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;