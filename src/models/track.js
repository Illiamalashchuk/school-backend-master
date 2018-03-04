import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  name: {
    artist: {
      type: String,
      default: 'New artist'
    },
    composition: {
      type: String,
      default: 'New composition'
    }
  },
  link: {
    type: Buffer,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('track', schema);
