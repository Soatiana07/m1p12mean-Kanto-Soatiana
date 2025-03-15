const express = require('express');
const router = express.Router();
const DetailsEntreePiece = require('../../models/Manager/DetailsEntreePiece');

router.post('/', async (req, res) => {
    try {
        const detail = new DetailsEntreePiece(req.body);
        await detail.save();
        res.status(201).json(detail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const detail = await DetailsEntreePiece.find();
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const detail = await DetailsEntreePiece.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(detail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;