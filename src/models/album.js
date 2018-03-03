import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  userName: { type: String, required: true },
  albumName: { type: String, required: true },
  albumList: {type: String}
});

export default mongoose.model('album', schema);