const mongoose = require('mongoose');

const exploreItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  details: {
    type: String,
  },
  subArticles: [
    {
      id: String,
      title: String,
      content: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ExploreItem', exploreItemSchema);
