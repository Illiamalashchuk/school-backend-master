import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    age: Number,
    email: {
      type: String,
      required: true
    }
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('user', schema);