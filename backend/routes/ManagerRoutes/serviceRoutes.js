const express = require('express');
const router = express.Router();
const Service = require('../../models/Manager/Service');

//insert
router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//liste
router.get('/', async (req, res) => {
    try {
        const service = await Service.find();
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//update
router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id,
            req.body, { new: true });
        res.json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({message: "Service supprimé"});
    } catch (error) {
        res.status(500).json({messgae: error.message});
    }
});
module.exports = router;