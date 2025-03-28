const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 5000;

// Middlware
app.use(cors());
app.use(express.json());

// Connexion a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoBD connecté"))
.catch(err => console.log(err));

// Routes montées sur '/articles'
app.use('/articles', require('./routes/articleRoutes'));
app.use('/detailEntreePiece', require('./routes/ManagerRoutes/detailsEntreePieceRoutes'));
app.use('/detailSortiePiece', require('./routes/ManagerRoutes/detailsSortiePieceRoutes'));
app.use('/entreePiece', require('./routes/ManagerRoutes/entreePieceRoutes'));
app.use('/fournisseur', require('./routes/ManagerRoutes/fournisseurRoutes'));
app.use('/marqueVoiture', require('./routes/ManagerRoutes/marqueVoitureRoutes'));
app.use('/modePaiement', require('./routes/ManagerRoutes/modePaiementRoutes'));
app.use('/pieces', require('./routes/ManagerRoutes/pieceRoutes'));
app.use('/sortiePiece', require('./routes/ManagerRoutes/sortiePieceRoutes'));
app.use('/anneeVoiture', require('./routes/ManagerRoutes/anneeVoitureRoutes'));
app.use('/categorieService', require('./routes/ManagerRoutes/categorieServiceRoutes'));
app.use('/generationVoiture', require('./routes/ManagerRoutes/generationVoitureRoutes'));
app.use('/service', require('./routes/ManagerRoutes/serviceRoutes'));
app.use('/historiquePrixService', require('./routes/ManagerRoutes/historiquePrixServiceRoutes'));
app.use('/pays', require('./routes/ManagerRoutes/paysRoutes'));
app.use('/role', require('./routes/EmployeRoutes/roleRoutes'));
app.use('/specialite', require('./routes/EmployeRoutes/specialiteRoutes'));
app.use('/employe', require('./routes/EmployeRoutes/employeRoutes'));
app.use('/specialiteEmploye', require('./routes/EmployeRoutes/specialiteEmployeRoutes'));
app.use('/specialiteService', require('./routes/EmployeRoutes/specialiteServiceRoutes'));
app.use('/stockPiece', require('./routes/ManagerRoutes/stockPieceRoutes'));

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`))
