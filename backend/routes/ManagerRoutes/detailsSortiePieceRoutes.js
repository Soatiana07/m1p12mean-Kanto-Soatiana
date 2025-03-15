const express = require('express');
const router = express.Router();
const DetailsSortiePiece = require('../../models/Manager/DetailsSortiePiece');

router.post('/', async (req, res) => {
    try {
        const details = new DetailsSortiePiece(req.body);
        await details.save();
        res.status(201).json(details);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const details = await DetailsSortiePiece.find();
        res.json(details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const details = await DetailsSortiePiece.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(details);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;