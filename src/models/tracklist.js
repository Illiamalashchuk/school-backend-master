import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  name: {
    type: String,
    default: 'New tracklist'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('tracklist', schema);