const express = require('express');
const PlayerController = require('../controllers/PlayerController');

const router = express.Router();
const playerController = new PlayerController();

// Player routes
router.get('/', playerController.getAllPlayers.bind(playerController));
router.get('/:id', playerController.getPlayerById.bind(playerController));
router.post('/', playerController.createPlayer.bind(playerController));
router.put('/:id', playerController.updatePlayer.bind(playerController));
router.delete('/:id', playerController.deletePlayer.bind(playerController));

module.exports = router;