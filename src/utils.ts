import { Row } from "./Row";

const ROWS_PER_PAGE = 30;

export function getTotalPages(numRows: number) {
  return Math.max(1, Math.ceil(numRows / ROWS_PER_PAGE));
}

export function getVisibleRows(rows: Row[], currentPage: number) {
  const start = currentPage * ROWS_PER_PAGE;
  const end = start + ROWS_PER_PAGE;

  return rows.slice(start, end);
}
