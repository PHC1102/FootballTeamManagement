import ApiService from './ApiService';
import Lineup from '../models/Lineup';

class LineupService {
  constructor() {
    this.apiService = new ApiService('/api/lineups');
  }

  // Get all lineups
  async getAllLineups() {
    try {
      const response = await this.apiService.get('');
      return response.data.map(lineupData => Lineup.fromJSON(lineupData));
    } catch (error) {
      console.error('Error fetching lineups:', error);
      throw error;
    }
  }

  // Get lineup by ID
  async getLineupById(id) {
    try {
      const response = await this.apiService.get(`/${id}`);
      return Lineup.fromJSON(response.data);
    } catch (error) {
      console.error(`Error fetching lineup with ID ${id}:`, error);
      throw error;
    }
  }

  // Create a new lineup
  async createLineup(lineup) {
    try {
      const response = await this.apiService.post('', lineup.toJSON());
      return Lineup.fromJSON(response.data);
    } catch (error) {
      console.error('Error creating lineup:', error);
      throw error;
    }
  }

  // Update a lineup
  async updateLineup(id, lineup) {
    try {
      const response = await this.apiService.put(`/${id}`, lineup.toJSON());
      return Lineup.fromJSON(response.data);
    } catch (error) {
      console.error(`Error updating lineup with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a lineup
  async deleteLineup(id) {
    try {
      await this.apiService.delete(`/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting lineup with ID ${id}:`, error);
      throw error;
    }
  }

  // Add a player to a lineup
  async addPlayerToLineup(lineupId, player, position) {
    try {
      const response = await this.apiService.post(`/${lineupId}/players`, { player, position });
      return Lineup.fromJSON(response.data);
    } catch (error) {
      console.error(`Error adding player to lineup with ID ${lineupId}:`, error);
      throw error;
    }
  }

  // Remove a player from a lineup
  async removePlayerFromLineup(lineupId, playerId) {
    try {
      const response = await this.apiService.delete(`/${lineupId}/players/${playerId}`);
      return Lineup.fromJSON(response.data);
    } catch (error) {
      console.error(`Error removing player from lineup with ID ${lineupId}:`, error);
      throw error;
    }
  }
}

export default LineupService;