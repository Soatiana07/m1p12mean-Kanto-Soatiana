const express = require('express');
const router = express.Router();
const SpecialiteEmploye = require('../../models/Employe/SpecialiteEmploye');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const specialiteEmploye = new SpecialiteEmploye(req.body);
        await specialiteEmploye.save();
        res.status(201).json(specialiteEmploye);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const specialiteEmploye = await SpecialiteEmploye.find();
        res.json(specialiteEmploye);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const specialiteEmploye = await SpecialiteEmploye.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(specialiteEmploye);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await SpecialiteEmploye.findByIdAndDelete(req.params.id);
        res.json({message: "SpecialiteEmploye supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});
module.exports = router;