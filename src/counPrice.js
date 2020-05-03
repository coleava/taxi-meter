const fs = require('fs');
const path = require('path');

class CountPrice {
  constructor(file) {
    this.initailValue = { 1: "收费6元\n", 3: "收费7元\n", 10: "收费13元\n", 2: "收费7元\n" };
    this.fileData = this.getFileData(file);
  }

  async getFileData(file) {
    let data = await new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, "../src", "./fixtures", file), 'utf-8',
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
    });
    return data.split(/\n/).map(str => {
      return {
        kilometer: parseInt(str.split(',')[0]),
        parkTime: parseInt(str.split(',')[1].substring(1).substring(1))
      };
    });
  }

  parse(kilometer, parkTime = 0) {
    let price = 6;
    if (kilometer > 0 && kilometer <= 2) price = Math.round(6 + parkTime * 0.25);
    else if (kilometer > 2 && kilometer < 8) {
      price = Math.round(6 + (kilometer - 2) * 0.8 + parkTime * 0.25);
    } else if (kilometer >= 8) {
      price = Math.round(6 + 0.8 * ((kilometer - 8) * 1.5 + 6) + parkTime * 0.25);
    } else { price = 0 };
    return `收费${price}元\n`;
  }
}
module.exports = CountPrice;