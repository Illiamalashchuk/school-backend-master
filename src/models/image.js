import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  link: {
    type: Buffer,
    
  },
  description: String,
  tag: String,
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('image', schema);
