class TipoJuegoModel {
  constructor(id, name, description, check) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.check = check;
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getCheck() {
    return this.check;
  }

  setID(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setCheck(check) {
    this.check = check;
  }
}

module.exports = TipoJuegoModel;
