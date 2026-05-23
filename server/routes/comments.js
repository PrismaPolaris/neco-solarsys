const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get comments for an item
router.get('/:itemId', async (req, res) => {
  try {
    const comments = await Comment.find({ itemId: req.params.itemId }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create comment
router.post('/', protect, [
  body('itemId').notEmpty(),
  body('text').notEmpty().trim(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { itemId, text } = req.body;

    const comment = new Comment({
      itemId,
      userId: req.user.id,
      username: req.user.username,
      text,
    });

    await comment.save();
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
