import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  userName: { type: String, required: true },
  userSurname: { type: String, required: true },
  userAge: { type: Number, required: true },
  userEmail: { type: String, required: true },
  
});

export default mongoose.model('user', schema);