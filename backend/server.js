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

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`))
