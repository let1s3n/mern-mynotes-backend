import {Schema, model} from 'mongoose'


const noteSchema = new Schema({
  title: String,
  content: {
    type: String,
    require: true
  },
  author: String,
  date: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

const Note = model('Note', noteSchema);

export default Note;