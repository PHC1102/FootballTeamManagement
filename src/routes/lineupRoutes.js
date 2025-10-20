const express = require('express');
const LineupController = require('../controllers/LineupController');

const router = express.Router();
const lineupController = new LineupController();

// Lineup routes
router.get('/', lineupController.getAllLineups.bind(lineupController));
router.get('/:id', lineupController.getLineupById.bind(lineupController));
router.post('/', lineupController.createLineup.bind(lineupController));
router.put('/:id', lineupController.updateLineup.bind(lineupController));
router.delete('/:id', lineupController.deleteLineup.bind(lineupController));

// Player management within lineup
router.post('/:id/players', lineupController.addPlayerToLineup.bind(lineupController));
router.delete('/:id/players/:playerId', lineupController.removePlayerFromLineup.bind(lineupController));

module.exports = router;