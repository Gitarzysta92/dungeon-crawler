

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

export function hash(value: string): string {
  return '';
}

export function generateRandomNumbers(amount: number, max: number): number[] {
  const numbers = Array.from(Array(amount).keys());
  return numbers.map(() => Math.round(Math.random() * max));
}