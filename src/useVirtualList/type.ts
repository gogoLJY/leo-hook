export interface IOptions {
  itemHeight: number | ((index: number) => number);
  overscan?: number
}