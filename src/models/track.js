import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  artist: {
    type: String,
    default: 'New artist'
  },
  composition: {
    type: String,
    default: 'New composition'
  },
  track: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Track'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('track', schema);
