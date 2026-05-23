const express = require('express');
const ExploreItem = require('../models/ExploreItem');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Get all explore items
router.get('/', async (req, res) => {
  try {
    const items = await ExploreItem.find();
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single explore item
router.get('/:id', async (req, res) => {
  try {
    const item = await ExploreItem.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create explore item (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const { id, name, category, description, image, details, subArticles } = req.body;

    let item = await ExploreItem.findOne({ id });
    if (item) {
      return res.status(400).json({ success: false, message: 'Item already exists' });
    }

    item = new ExploreItem({
      id,
      name,
      category,
      description,
      image,
      details,
      subArticles: subArticles || [],
    });

    await item.save();
    res.status(201).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
