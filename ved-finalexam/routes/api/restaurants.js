const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant');
const mongoose = require('mongoose');

/**
 * GET /api/restaurants
 * Query params:
 *   - page (optional): page number (defaults to 1)
 *
 * Returns paginated list (10 per page)
 */
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    const [items, totalCount] = await Promise.all([
      Restaurant.find().skip(skip).limit(limit).exec(),
      Restaurant.countDocuments().exec()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      page,
      perPage: limit,
      totalItems: totalCount,
      totalPages,
      items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /api/restaurants
 * Body: JSON with restaurant info
 * create a new restaurant record
 */
router.post('/', async (req, res) => {
  try {
    const { name, address, phoneNumber, emailAddress, rating } = req.body;

    // Basic validation
    if (!name || !address || !phoneNumber || !emailAddress || rating === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ratingNum = Number(rating);
    if (Number.isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
      return res.status(400).json({ error: 'Rating must be a number between 1 and 10' });
    }

    const restaurant = new Restaurant({
      name,
      address,
      phoneNumber,
      emailAddress,
      rating: ratingNum
    });

    const saved = await restaurant.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * DELETE /api/restaurants/:_id
 * Remove restaurant by _id
 */
router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const deleted = await Restaurant.findByIdAndDelete(_id).exec();
    if (!deleted) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json({ message: 'Deleted', deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
