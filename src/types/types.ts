export enum SortState {
  INACTIVE,
  DESC,
  ASC,
}

type Extends<T, U extends T> = U

export type ColumnKeys = "hash" | "timestamp" | "amount" | "from" | "to"
export type ColumnKeysSortable = Extends<ColumnKeys, "timestamp" | "amount">
export type ColumnKeysFilterable = Extends<ColumnKeys, "from" | "to">
