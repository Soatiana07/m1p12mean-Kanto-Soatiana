const express = require('express');
const router = express.Router();
const CategorieService = require('../../models/Manager/CategorieService');

// insert
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const nomCategorie = new CategorieService(req.body);
        await nomCategorie.save();
        res.status(201).json(nomCategorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const nomCategorie = await CategorieService.find();
        res.json(nomCategorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const nomCategorie = await CategorieService.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(nomCategorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await CategorieService.findByIdAndDelete(req.params.id);
        res.json({message: "Categorie supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});
module.exports = router;