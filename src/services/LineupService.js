const Lineup = require('../models/Lineup');

class LineupService {
  constructor() {
    // In a real application, this would be a database
    this.lineups = [];
  }

  // Create a new lineup
  createLineup(lineupData) {
    const newLineup = new Lineup(
      this.lineups.length + 1,
      lineupData.name,
      lineupData.formation,
      lineupData.players || []
    );
    this.lineups.push(newLineup);
    return newLineup;
  }

  // Get all lineups
  getAllLineups() {
    return this.lineups;
  }

  // Get lineup by ID
  getLineupById(id) {
    return this.lineups.find(lineup => lineup.getId() === id);
  }

  // Update lineup
  updateLineup(id, updateData) {
    const lineupIndex = this.lineups.findIndex(lineup => lineup.getId() === id);
    if (lineupIndex === -1) {
      return null;
    }

    const lineup = this.lineups[lineupIndex];
    
    // Update only provided fields
    if (updateData.name !== undefined) lineup.setName(updateData.name);
    if (updateData.formation !== undefined) lineup.setFormation(updateData.formation);
    if (updateData.players !== undefined) {
      try {
        lineup.setPlayers(updateData.players);
      } catch (error) {
        throw new Error(`Failed to update players: ${error.message}`);
      }
    }

    return lineup;
  }

  // Delete lineup
  deleteLineup(id) {
    const lineupIndex = this.lineups.findIndex(lineup => lineup.getId() === id);
    if (lineupIndex === -1) {
      return false;
    }

    this.lineups.splice(lineupIndex, 1);
    return true;
  }

  // Add a player to a lineup
  addPlayerToLineup(lineupId, player, position) {
    const lineup = this.getLineupById(lineupId);
    if (!lineup) {
      throw new Error("Lineup not found");
    }

    try {
      lineup.addPlayer(player, position);
      return lineup;
    } catch (error) {
      throw new Error(`Failed to add player: ${error.message}`);
    }
  }

  // Remove a player from a lineup
  removePlayerFromLineup(lineupId, playerId) {
    const lineup = this.getLineupById(lineupId);
    if (!lineup) {
      throw new Error("Lineup not found");
    }

    lineup.removePlayer(playerId);
    return lineup;
  }
}

module.exports = LineupService;