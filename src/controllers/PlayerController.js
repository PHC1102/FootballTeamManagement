const BaseController = require('./BaseController');
const PlayerService = require('../services/PlayerService');

class PlayerController extends BaseController {
  constructor() {
    super();
    this.playerService = new PlayerService();
  }

  getAllPlayers(req, res) {
    try {
      const players = this.playerService.getAllPlayers();
      this.sendSuccess(res, players, "Players retrieved successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }

  getPlayerById(req, res) {
    try {
      const { id } = req.params;
      const player = this.playerService.getPlayerById(parseInt(id));
      
      if (!player) {
        return this.sendError(res, { message: "Player not found" }, 404);
      }
      
      this.sendSuccess(res, player, "Player retrieved successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }

  createPlayer(req, res) {
    try {
      const player = this.playerService.createPlayer(req.body);
      this.sendSuccess(res, player, "Player created successfully", 201);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  updatePlayer(req, res) {
    try {
      const { id } = req.params;
      const player = this.playerService.updatePlayer(parseInt(id), req.body);
      
      if (!player) {
        return this.sendError(res, { message: "Player not found" }, 404);
      }
      
      this.sendSuccess(res, player, "Player updated successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }

  deletePlayer(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = this.playerService.deletePlayer(parseInt(id));
      
      if (!isDeleted) {
        return this.sendError(res, { message: "Player not found" }, 404);
      }
      
      this.sendSuccess(res, {}, "Player deleted successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }
}

module.exports = PlayerController;