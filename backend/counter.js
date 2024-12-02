let currentCounter = 102;

function getNextSequence() {
  currentCounter += 1;
  return currentCounter;
}

module.exports = { getNextSequence };
