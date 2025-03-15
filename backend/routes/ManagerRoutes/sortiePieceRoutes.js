const express = require('express');
const router = express.Router();
const SortiePiece = require('../../models/Manager/SortiePiece');

router.post('/', async (req, res) => {
    try {
        const sortie = new SortiePiece(req.body);
        await sortie.save();
        res.status(201).json(sortie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const sortie = await SortiePiece.find();
        res.json(sortie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const sortie = await SortiePiece.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(sortie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;