const { merge } = require('sol-merger');
const fs = require('fs')

const main = async () => {
  // Get the merged code as a string
  const mergedCode = await merge("./contracts/MyContract.sol");
  // Print it out or write it to a file etc.
  console.log(mergedCode);

  fs.writeFile('./result.txt', mergedCode, err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
