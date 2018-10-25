function makeChange(coins, amount) {
  const sortedCoins = coins.sort((a, b) => b - a);
  let i = 0;
  let resultCoins = [];

  while (amount > 0) {
    if (sortedCoins[i] <= amount) {
      resultCoins.push(sortedCoins[i]);
      amount -= sortedCoins[i];
    } else {
      i++;
    }
  }
  return resultCoins;
}

// TODO: Make return items of coins
function makeChangeGreedy(coins, amount) {
  const sortedCoins = coins.sort((a, b) => b - a);

  const makeChange = value => {
    if (value === 0) return 0;
    let minCoins;

    sortedCoins.forEach(coin => {
      if (value - coin >= 0) {
        let newMinCoin = makeChange(value - coin);

        if (minCoins === undefined || newMinCoin < minCoins) {
          minCoins = newMinCoin;
        }
      }
    });

    return minCoins + 1;
  };

  return makeChange(amount);
}
