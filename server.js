require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");

const app = express();
const PORT = 3000;


app.use(express.json()); // pour le post 

//connexion mongo
mongoose.connect(process.env.mongoURI)
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("<h1>Eh Bienvenue sur Birdex 🐦</h1>");
});

// J'inclu la route birds.js 
const birdsRoutes = require("./routes/birds");
app.use("/birds", birdsRoutes);


app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});