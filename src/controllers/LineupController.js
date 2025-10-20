const BaseController = require('./BaseController');
const LineupService = require('../services/LineupService');

class LineupController extends BaseController {
  constructor() {
    super();
    this.lineupService = new LineupService();
  }

  getAllLineups(req, res) {
    try {
      const lineups = this.lineupService.getAllLineups();
      this.sendSuccess(res, lineups, "Lineups retrieved successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }

  getLineupById(req, res) {
    try {
      const { id } = req.params;
      const lineup = this.lineupService.getLineupById(parseInt(id));
      
      if (!lineup) {
        return this.sendError(res, { message: "Lineup not found" }, 404);
      }
      
      this.sendSuccess(res, lineup, "Lineup retrieved successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }

  createLineup(req, res) {
    try {
      const lineup = this.lineupService.createLineup(req.body);
      this.sendSuccess(res, lineup, "Lineup created successfully", 201);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  updateLineup(req, res) {
    try {
      const { id } = req.params;
      const lineup = this.lineupService.updateLineup(parseInt(id), req.body);
      
      if (!lineup) {
        return this.sendError(res, { message: "Lineup not found" }, 404);
      }
      
      this.sendSuccess(res, lineup, "Lineup updated successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }

  deleteLineup(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = this.lineupService.deleteLineup(parseInt(id));
      
      if (!isDeleted) {
        return this.sendError(res, { message: "Lineup not found" }, 404);
      }
      
      this.sendSuccess(res, {}, "Lineup deleted successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }

  addPlayerToLineup(req, res) {
    try {
      const { id } = req.params;
      const { player, position } = req.body;
      const lineup = this.lineupService.addPlayerToLineup(parseInt(id), player, position);
      this.sendSuccess(res, lineup, "Player added to lineup successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }

  removePlayerFromLineup(req, res) {
    try {
      const { id, playerId } = req.params;
      const lineup = this.lineupService.removePlayerFromLineup(parseInt(id), parseInt(playerId));
      this.sendSuccess(res, lineup, "Player removed from lineup successfully");
    } catch (error) {
      this.sendError(res, error);
    }
  }
}

module.exports = LineupController;