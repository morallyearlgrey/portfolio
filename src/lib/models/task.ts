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
  colorSet: {
    type: String,
    required: true,
    default: ""
  },
  isComplete: {
    type: Boolean,
    required: false,
    default: false
  },
  order: {
    type: Number,
    required: false,
    default: 0
  }
});

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);