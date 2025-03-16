const express = require('express');
const router = express.Router();
const AnneeVoiture = require('../../models/Manager/AnneeVoiture');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const annee = new AnneeVoiture(req.body);
        await annee.save();
        res.status(201).json(annee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const annee = await AnneeVoiture.find();
        res.json(annee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const annee = await AnneeVoiture.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(annee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await AnneeVoiture.findByIdAndDelete(req.params.id);
        res.json({message: "Année supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});

module.exports = router;