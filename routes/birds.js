// routes/birds.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Bird = require('../modele/schema_bird');

//lire tous les oiseaux
router.get("/", async (req, res) => {
    const birds = await Bird.find();
    res.json(birds);
});

//ajouter un oiseau
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

//delete un oiseau trouvé par son Id
router.delete("/:id", async (req, res) => {
    try {
        const deletedBird = await Bird.findByIdAndDelete(req.params.id);

        if (!deletedBird) {
            return res.status(404).json({ error: "Oiseau non trouvé" });
        }

        res.status(200).json({
            message: "Oiseau supprimé",
            bird: deletedBird
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
)

//montrer un oiseau trouvé par son Id
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

router.put("/:id", async (req, res) => {
    try {
        const birdPut = await Bird.findById(req.params.id);
        if (!birdPut) {
            return res.status(404).json({ error: "Oiseau non trouvé" });
        }

        birdPut.name = req.body.name;
        await birdPut.save();
        res.status(200).json({
            message : "nom de l'oiseau modifié !",
            bird : birdPut
        })
        
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
}



)



module.exports = router;