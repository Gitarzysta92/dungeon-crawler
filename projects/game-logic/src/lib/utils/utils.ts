

export function randomNumbersGenerator(count: number): number[] {

  const numbers = Array.from(Array(count).keys());

  count -= 1;

  while(count > 0) {
    const r = Math.round(Math.random() * count);

    let target = numbers[r];
    let current = numbers[count];

    numbers[count] = target;
    numbers[r] = current;

    --count;
  }

  return numbers;
}

export function hash(value: string): string {
  return '';
}
