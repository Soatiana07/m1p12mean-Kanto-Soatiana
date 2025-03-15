const express = require('express');
const router = express.Router();
const EntreePiece = require('../../models/Manager/EntreePiece');

router.post('/', async (req, res) => {
    try {
        const entree = new EntreePiece(req.body);
        await entree.save();
        res.status(201).json(entree);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const entree = await EntreePiece.find();
        res.json(entree);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const entree = await EntreePiece.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(entree);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;