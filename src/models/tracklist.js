import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  userName: { type: String, required: true },
  tracklistName: { type: String, required: true },
  tracklistList: {type: String}
});

export default mongoose.model('tracklist', schema);