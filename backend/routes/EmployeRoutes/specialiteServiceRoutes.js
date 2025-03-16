const express = require('express');
const router = express.Router();
const SpecialiteService = require('../../models/Employe/SpecialiteService');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const specialiteService = new SpecialiteService(req.body);
        await specialiteService.save();
        res.status(201).json(specialiteService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const specialiteService = await SpecialiteService.find();
        res.json(specialiteService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const specialiteService = await SpecialiteService.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(specialiteService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await SpecialiteService.findByIdAndDelete(req.params.id);
        res.json({message: "SpecialiteService supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});
module.exports = router;