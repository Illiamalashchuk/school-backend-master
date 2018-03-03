import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  userName: {type: String, required: true},
  trackName: {type: String, required: true},
  trackLink: {type: String, required: true},
  trackDate: {type: String, required: true},
  trackList: {type: String} 
});

export default mongoose.model('track', schema);
