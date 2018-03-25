import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'New album'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('album', schema);