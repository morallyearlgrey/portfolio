import mongoose, { Types } from 'mongoose';

const taskSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
  },
  course: {
    type: String,
    required: false,
    default: ""
  },
  subject: {
    type: String,
    required: false,
    default: ""
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  isComplete: {
    type: Boolean,
    required: false,
    default: false
  }
});

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);