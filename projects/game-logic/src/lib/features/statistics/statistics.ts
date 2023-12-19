export function calculateStatsDifference<T extends object>(source: T, target: T): number {
  return getStatsDifferences(source, target).reduce((c, s) => c += s.value, 0)
}


export function getStatsDifferences<T extends object>(source: T, target: T): { statName: string, value: number }[] {
  return Object.entries(source).reduce((c, s) =>
    c.concat({ statName: s[0], value: target[s[0] as keyof typeof target] as unknown as number - s[1] }), [] as { statName: string, value: number }[])
}