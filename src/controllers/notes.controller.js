import Note from '../models/Note';

const notesCtrl = {};

notesCtrl.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes)
}

notesCtrl.createNote = async (req, res) => {
  const { title, content, date, author } = req.body;
  const newNote = new Note({
    title,
    content,
    date,
    author
  });
  await newNote.save();
  res.json({ message: 'Note Saved' })
};

notesCtrl.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note)
};

notesCtrl.updateNote = async (req, res) => {
  const { title, content, date, author } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    title,
    content,
    date,
    author
  })
  res.json({ message: 'Note Updated' })
};


notesCtrl.deleteNote = async (req, res) => {
  console.log(req.params.id);
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note Deleted' })
};
export default notesCtrl;