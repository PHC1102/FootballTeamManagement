class Player {
  constructor(id, name, position, age, team) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.age = age;
    this.team = team;
  }

  // Getters
  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPosition() {
    return this.position;
  }

  getAge() {
    return this.age;
  }

  getTeam() {
    return this.team;
  }

  // Setters
  setName(name) {
    this.name = name;
  }

  setPosition(position) {
    this.position = position;
  }

  setAge(age) {
    this.age = age;
  }

  setTeam(team) {
    this.team = team;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      position: this.position,
      age: this.age,
      team: this.team
    };
  }

  // Static method to create a Player from JSON
  static fromJSON(json) {
    return new Player(
      json.id,
      json.name,
      json.position,
      json.age,
      json.team
    );
  }
}

module.exports = Player;