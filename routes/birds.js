// routes/birds.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
conbvgst Bird = require('../modele/schema_bird');
trbhgfyt
//const Bird = mongoose.model("Bird", birdSchema);
//lire tous les oiseaux
router.get("/", async (req, res) => {
    const birds = await Bird.find();
    res.json(birds);
});

router.post("/", async (req, res) => {
    try {
        const bird = new Bird({
            name: req.body.name,
            location: req.body.location
        });

        const savedBird = await bird.save();
        res.status(201).json(savedBird);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;