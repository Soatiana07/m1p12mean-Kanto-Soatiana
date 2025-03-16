const express = require('express');
const router = express.Router();
const Employe = require('../../models/Employe/Employe');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const nomEmploye = new Employe(req.body);
        await nomEmploye.save();
        res.status(201).json(nomEmploye);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const nomEmploye = await Employe.find();
        res.json(nomEmploye);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const nomEmploye = await Employe.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(nomEmploye);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await Employe.findByIdAndDelete(req.params.id);
        res.json({message: "employe supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});
module.exports = router;