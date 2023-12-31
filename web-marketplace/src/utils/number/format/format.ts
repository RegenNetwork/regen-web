/* roundFloatNumber */

export type RoundFloatNumberParamsOptions = {
  decimals?: number;
};

export const roundFloatNumber = (
  number: number,
  options?: RoundFloatNumberParamsOptions,
): number => {
  const decimals = options?.decimals ?? 2;
  const base = Math.pow(10, decimals);
  return Math.round(number * base) / base;
};

/* floorFloatNumber */

export type FloorFloatNumberParamsOptions = {
  decimals?: number;
};

export const floorFloatNumber = (
  number: number,
  options?: FloorFloatNumberParamsOptions,
): number => {
  const decimals = options?.decimals ?? 2;
  const base = Math.pow(10, decimals);
  return Math.floor(number * base) / base;
};
