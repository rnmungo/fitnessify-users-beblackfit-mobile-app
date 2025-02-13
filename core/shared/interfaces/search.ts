export interface Paged<T> {
  results: Array<T>;
  currentPage: number;
  sizeLimit: number;
  total: number;
  pages: number;
}
