// routes/birds.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Bird = require('../modele/schema_bird');

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
            location: req.body.location,
            date: req.body.date
        });

        const savedBird = await bird.save();
        res.status(201).json(savedBird);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    const deleteBird = await Bird.findByIdAndDelete(req.params.id);

    if (!deleteBird) {
        return res.status(404).json({ error: "Oiseau non trouvé" });
    }

    res.status(201).json(deleteBird);
}
)

router.get("/ping", (req, res) => {
    res.send("Bird route OK");
});

router.get("/:id", async (req, res) => {
    try {
        const bird = await Bird.findById(req.params.id);

        if (!bird) {
            return res.status(404).json({ error: "Oiseau non trouvé" });
        }

        res.status(200).json(bird);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



module.exports = router;