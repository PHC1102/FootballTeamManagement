const Player = require('../models/Player');

class PlayerService {
  constructor() {
    // In a real application, this would be a database
    this.players = [];
  }

  // Create a new player
  createPlayer(playerData) {
    const newPlayer = new Player(
      this.players.length + 1,
      playerData.name,
      playerData.position,
      playerData.age,
      playerData.team
    );
    this.players.push(newPlayer);
    return newPlayer;
  }

  // Get all players
  getAllPlayers() {
    return this.players;
  }

  // Get player by ID
  getPlayerById(id) {
    return this.players.find(player => player.getId() === id);
  }

  // Update player
  updatePlayer(id, updateData) {
    const playerIndex = this.players.findIndex(player => player.getId() === id);
    if (playerIndex === -1) {
      return null;
    }

    const player = this.players[playerIndex];
    
    // Update only provided fields
    if (updateData.name !== undefined) player.setName(updateData.name);
    if (updateData.position !== undefined) player.setPosition(updateData.position);
    if (updateData.age !== undefined) player.setAge(updateData.age);
    if (updateData.team !== undefined) player.setTeam(updateData.team);

    return player;
  }

  // Delete player
  deletePlayer(id) {
    const playerIndex = this.players.findIndex(player => player.getId() === id);
    if (playerIndex === -1) {
      return false;
    }

    this.players.splice(playerIndex, 1);
    return true;
  }
}

module.exports = PlayerService;