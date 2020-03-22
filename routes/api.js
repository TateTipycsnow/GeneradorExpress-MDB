let express = require('express');
let router = express.Router();

let Zombie = require('../models/zombie');
let Cerebro = require('../models/cerebro');

router.get('/zombies', async(req, res) => {
    Zombie.find().exec((error, zombies) => {
        if (!error) {
            res.status(200).json(zombies);
        } else {
            res.status(500).json(error);
        }
    });
});

router.post('/zombies/new', async function(req, res) {
    var data = req.body;

    var nuevoZombie = new Zombie({
        Name: data.Name,
        Mail: data.Mail,
        Type: data.Type
    });

    nuevoZombie.save(function(error) {
        let Campos = ["Name", "Mail", "Type"];

        if (error) {
            for (var i = 0; i < Campos.length; i++) {
                var Campo = Campos[i];
                if (error.errors[Campo]) {
                    mensajeResultante = error.errors[Campo].message;
                    res.status(500).json({ Alerta: "alert alert-danger", Mensaje: mensajeResultante, Hide: '' });
                }
            }
        } else {
            res.status(200).json({ Alerta: "alert alert-success", Mensaje: "Zombie agregado", Hide: '' });
        }
    });
});

router.delete('/zombies/delete/:id', async function(req, res) {
    var ZombieD = await Zombie.findById(req.params.id);

    try {
        ZombieD.remove();
        res.redirect('/');
    } catch (error) {
        res.status(200).json({ Zombie: ZombieD });
    }
});

router.get('/cerebros', async(req, res) => {
    Cerebro.find().exec((error, cerebros) => {
        if (!error) {
            res.status(200).json(cerebros);
        } else {
            res.status(500).json(error);
        }
    });
});

module.exports = router;