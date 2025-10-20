class Lineup {
  constructor(id, name, formation, players = []) {
    this.id = id;
    this.name = name; // Name/description of the lineup
    this.formation = formation; // e.g., "4-4-2", "3-5-2", etc.
    this.players = players; // Array of 11 players (should validate this)
  }

  // Getters
  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getFormation() {
    return this.formation;
  }

  getPlayers() {
    return this.players;
  }

  getPlayerCount() {
    return this.players.length;
  }

  // Setters
  setName(name) {
    this.name = name;
  }

  setFormation(formation) {
    this.formation = formation;
  }

  setPlayers(players) {
    // Validate that we have exactly 11 players
    if (players.length !== 11) {
      throw new Error("A lineup must contain exactly 11 players");
    }
    this.players = players;
  }

  // Add a player to the lineup (with position validation)
  addPlayer(player, position) {
    if (this.players.length >= 11) {
      throw new Error("Cannot add more than 11 players to a lineup");
    }
    
    // Add position information to the player object
    const playerWithPosition = {
      ...player,
      lineupPosition: position
    };
    
    this.players.push(playerWithPosition);
    return this.players;
  }

  // Remove a player from the lineup
  removePlayer(playerId) {
    this.players = this.players.filter(player => player.id !== playerId);
    return this.players;
  }

  // Check if lineup is complete (has 11 players)
  isComplete() {
    return this.players.length === 11;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      formation: this.formation,
      players: this.players
    };
  }

  // Static method to create a Lineup from JSON
  static fromJSON(json) {
    return new Lineup(
      json.id,
      json.name,
      json.formation,
      json.players || []
    );
  }
}

module.exports = Lineup;