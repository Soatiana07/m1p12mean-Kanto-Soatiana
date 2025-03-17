const express = require('express');
const router = express.Router();
const MarqueVoiture = require('../../models/Manager/MarqueVoiture');

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const marque = new MarqueVoiture(req.body);
        await marque.save();
        res.status(201).json(marque);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const marque = await MarqueVoiture.find();
        res.json(marque);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const marque = await MarqueVoiture.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(marque);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        console.log('hey');
        await MarqueVoiture.findByIdAndDelete(req.params.id);
        res.json({message: "Marque supprimé"});
    } catch (error) {
        console.log('bye');
        res.status(500).json({messgae: error.message});
    }
});
module.exports = router;