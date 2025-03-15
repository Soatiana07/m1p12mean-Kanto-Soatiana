const express = require('express');
const router = express.Router();
const Fournisseur = require('../../models/Manager/Fournisseur');

router.post('/', async (req, res) => {
    try {
        const fournisseur = new Fournisseur(req.body);
        await fournisseur.save();
        res.status(201).json(fournisseur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const fournisseur = await Fournisseur.find();
        res.json(fournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const fournisseur = await Fournisseur.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(fournisseur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;