const CountPrice = require('./counPrice');

module.exports = async function main(testDataFile = 'testData.txt') {
  const fileData = await new CountPrice(testDataFile).fileData;
  const receipt = { fileData, file: testDataFile };
  return receipt;
};
