class TipoMonedaModel {
  constructor(id, name, symbolt) {
    this.id = id;
    this.name = name;
    this.symbolt = symbolt;
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getSymbolt() {
    return this.symbolt;
  }

  setID(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  setSymbolt(symbolt) {
    this.symbolt = symbolt;
  }
}

module.exports = TipoMonedaModel;
