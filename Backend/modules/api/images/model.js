const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentModel = new Schema({
  createdBy: {
    type: String, required: true
  },
  content: { type: String, required: true}
}, {
  timestamps: {createdAt: "createAt"}
});

const imageModel = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdBy: {
    type: String, //Schema.type.ObjectId
    required: true
  },
  view: {
    type: Number,
    default: 0
  },
  like: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  comment: {
    type: [commentModel],
    default: []
  }
}, {
  timestamps: {createdAt: "createAt"}
});


module.exports = mongoose.model('images', imageModel);