import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  name: {
    type: String,
    default: 'New album'
  },
  description: String,
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('album', schema);