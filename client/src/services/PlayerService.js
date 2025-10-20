import ApiService from './ApiService';
import Player from '../models/Player';

class PlayerService {
  constructor() {
    this.apiService = new ApiService('/api/players');
  }

  // Get all players
  async getAllPlayers() {
    try {
      const response = await this.apiService.get('');
      return response.data.map(playerData => Player.fromJSON(playerData));
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  }

  // Get player by ID
  async getPlayerById(id) {
    try {
      const response = await this.apiService.get(`/${id}`);
      return Player.fromJSON(response.data);
    } catch (error) {
      console.error(`Error fetching player with ID ${id}:`, error);
      throw error;
    }
  }

  // Create a new player
  async createPlayer(player) {
    try {
      const response = await this.apiService.post('', player.toJSON());
      return Player.fromJSON(response.data);
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  }

  // Update a player
  async updatePlayer(id, player) {
    try {
      const response = await this.apiService.put(`/${id}`, player.toJSON());
      return Player.fromJSON(response.data);
    } catch (error) {
      console.error(`Error updating player with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a player
  async deletePlayer(id) {
    try {
      await this.apiService.delete(`/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting player with ID ${id}:`, error);
      throw error;
    }
  }
}

export default PlayerService;