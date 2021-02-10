class LibroModel {
  constructor(id, name, editorial, price, bookType, language, img, isbn, numPages,
    summary, coinType) {
    this.id = id;
    this.name = name;
    this.editorial = editorial;
    this.price = price;
    this.bookType = bookType;
    this.language = language;
    this.img = img;
    this.isbn = isbn;
    this.numPages = numPages;
    this.summary = summary;
    this.coinType = coinType;
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEditorial() {
    return this.editorial;
  }

  getPrice() {
    return this.price;
  }

  getBookType() {
    return this.bookType;
  }

  getLanguage() {
    return this.language;
  }

  getImg() {
    return this.img;
  }

  getIsbn() {
    return this.isbn;
  }

  getNumPages() {
    return this.numPages;
  }

  getSummary() {
    return this.summary;
  }

  getCoinType() {
    return this.coinType;
  }

  setID(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  setEditorial(editorial) {
    this.editorial = editorial;
  }

  setPrice(price) {
    this.price = price;
  }

  setBookType(bookType) {
    this.bookType = bookType;
  }

  setLanguage(language) {
    this.language = language;
  }

  setImg(img) {
    this.img = img;
  }

  setIsbn(isbn) {
    this.isbn = isbn;
  }

  setNumPages(numPages) {
    this.numPages = numPages;
  }

  setSummary(summary) {
    this.summary = summary;
  }

  setCoinType(coinType) {
    this.coinType = coinType;
  }
}

module.exports = LibroModel;
