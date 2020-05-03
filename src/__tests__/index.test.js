const receipt = require('../index');
const CountPrice = require('../counPrice');

const initial = async () => {
  const receiptData = await receipt();
  const { file } = receiptData;
  const countPrice = new CountPrice(file);
  const { initailValue } = countPrice;
  return { receiptData, countPrice, initailValue };
};

test('get file data test ', async () => {
  const { receiptData, countPrice, initailValue } = await initial();
  receiptData.fileData.forEach(el => {
    const description = countPrice.parse(el.kilometer, el.parkTime);
    expect(initailValue[el.kilometer]).toEqual(description);
  });
});

test('收费6元\n', async () => {
  const { initailValue, countPrice } = await initial();
  expect(initailValue['1']).toEqual(countPrice.parse(1, 0));
});

test('收费7元\n', async () => {
  const { initailValue, countPrice } = await initial();
  expect(initailValue['3']).toEqual(countPrice.parse(3, 0));
});

test('收费13元\n', async () => {
  const { initailValue, countPrice } = await initial();
  expect(initailValue['10']).toEqual(countPrice.parse(10, 0));
});

test('收费7元\n', async () => {
  const { initailValue, countPrice } = await initial();
  expect(initailValue['2']).toEqual(countPrice.parse(2, 3));
});

