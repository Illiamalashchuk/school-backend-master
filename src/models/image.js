import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  img: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  album: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('image', schema);
