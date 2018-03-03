import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  userName: {type: String, required: true},
  imageLink: {type: String, required: true},
  imageDate: {type: String, required: true},
  imageDescription: {type: String},
  imageTag: {type: String},
  imageAlbum: {type: String}
});

export default mongoose.model('image', schema);
