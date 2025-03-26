const express = require('express');
const DemandeDevis = require('../../models/Client/DemandeDevis');
const DetailsDemandeDevis = require('../../models/Client/DetailsDemandeDevis');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const nodemailer = require('nodemailer');

// insert
router.post('/', async (req, res) => {
    try {
        const { dateDemandeDevis, idVoitureClient, details } = req.body;
        const demande = new DemandeDevis({
            dateDemandeDevis,
            idVoitureClient
        });
        await demande.save();

        const services = req.body.details;
        for (const service of services) {
            const detail = new DetailsDemandeDevis({
                idDemandeDevis: demande._id,
                idService: service.idService,
                qte: Number(service.nombre)
            });
            await detail.save();
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kantomiharizo@gmail.com',      // email
                pass: 'vcaz bbsr avjj xmxm'       // mot de passe d'application
            }
        });

        const text = "Le client a soumis une demande de devis en date du " + dateDemandeDevis + ", correspondant au devis numero DEVIS_" + demande._id;
        const mailOptions = {
            from: 'kantomiharizo@gmail.com',
            to: "kantomiharizo@gmail.com",
            subject: "DEMANDE DE DEVIS ",
            text: text
        };
        const info = await transporter.sendMail(mailOptions);


        res.status(201).json(demande);
    } catch (error) {
        console.error('Erreur lors de l\'envoi :', error);
        res.status(400).json({ message: error.message });
    }
});

// Liste
router.get('/', async (req, res) => {
    try {
        const demande = await DemandeDevis.find()
            .populate({
                path: "idVoitureClient",
                populate: [
                    { path: "idClient" },
                    { path: "idAnnee" },
                    { path: "idGeneration" },
                    { path: "idMarque" },
                    { path: "idModele" }
                ]
            })
            .exec();
        res.json(demande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getDemandeDevisById/:id', async (req, res) => {
    try {
        const voiture = await DemandeDevis.find({ _id: req.params.id })
            .populate({
                path: "idVoitureClient",
                populate: [
                    { path: "idClient" },
                    { path: "idAnnee" },
                    { path: "idGeneration" },
                    { path: "idMarque" },
                    { path: "idModele" }
                ]
            })
            .exec();

        res.json(voiture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kantomiharizo@gmail.com',      // email
            pass: 'vcaz bbsr avjj xmxm'       // mot de passe d'application
        }
    });


    const mailOptions = {
        from: 'kantomiharizo@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé : ' + info.response);
        res.status(200).json({ message: 'Email envoyé avec succès!' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi :', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
});

router.post('/send-email1', upload.single('attachment'), async (req, res) => {
    const { to, subject, text } = req.body;
    const attachment = req.file; // Récupération du fichier PDF

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kantomiharizo@gmail.com', // Ton email
            pass: 'vcaz bbsr avjj xmxm' // Ton mot de passe d'application
        }
    });

    const mailOptions = {
        from: 'kantomiharizo@gmail.com',
        to: to,
        subject: subject,
        text: text,
        attachments: attachment
            ? [{
                filename: attachment.originalname,
                content: attachment.buffer
            }]
            : []
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé : ' + info.response);
        res.status(200).json({ message: 'Email envoyé avec succès!' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi :', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
});




router.post('/ajoutPieceDemandeDevis', async (req, res) => {
    try {
        console.log("ankino");
        const { heureFini, minuteFini, idDemandeDevis, details, noteVoiture,services} = req.body;
        console.log(services);
        const demande = await DemandeDevis.findOne({ _id: idDemandeDevis });
       
        console.log(demande);
        demande.dateDemandeDevis = demande.dateDemandeDevis,
        demande.heureFini = Number(heureFini),
        demande.minuteFini = Number(minuteFini)
        await demande.save();

        for( const service of services){
            const serv = await DetailsDemandeDevis.findOne({ _id: service._id });
            serv.prixBaseService = Number(service.idService.prixBase);
            await serv.save();
        }

        const pieces = req.body.details;
        if (!pieces || pieces.length === 0) {
            console.log("Aucune pièce à ajouter.");
        } else {
            for (const piece of pieces) {
                const detail = new DetailsDemandeDevis({
                    idDemandeDevis: idDemandeDevis,
                    idPiece: piece.idPiece,
                    qte: Number(piece.nombre),
                    prixUnitairePiece: Number(piece.prixUnitairePiece)
                });
                await detail.save();
            }
        }

        res.status(201).json(demande);
    } catch (error) {
        console.error('Erreur lors de l\'envoi :', error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;