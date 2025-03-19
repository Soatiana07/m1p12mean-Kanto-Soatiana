const express = require('express');
const router = express.Router();
const Piece = require('../../models/Manager/Piece');

router.post('/', async (req, res) => {
    try {
        const piece = new Piece(req.body);
        await piece.save();
        res.status(201).json(piece);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const piece = await Piece.find();
        res.json(piece);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const piece = await Piece.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(piece);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/cherchePiece', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.json([]); 
        }
        const piece = await Piece.find({ nomPiece: { $regex: query, $options: 'i' } });
        res.json(piece);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;