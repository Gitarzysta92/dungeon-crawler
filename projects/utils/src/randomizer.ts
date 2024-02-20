

export function generateRandomNumbersFromZeroTo(amount: number): number[] {

  const numbers = Array.from(Array(amount).keys());

  amount -= 1;

  while(amount > 0) {
    const r = Math.round(Math.random() * amount);

    let target = numbers[r];
    let current = numbers[amount];

    numbers[amount] = target;
    numbers[r] = current;

    --amount;
  }

  return numbers;
}

export function generateRandomNumbers(amount: number, max: number): number[] {
  const numbers = Array.from(Array(amount).keys());
  return numbers.map(() => Math.round(Math.random() * max));
}

export function shuffleArray<T extends object>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
} 