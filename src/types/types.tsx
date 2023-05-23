export enum SortState {
    // Note that if keys/values are changed, Icons order in
    // src/components/SortableColumn needs to be changed as well
    INACTIVE = 0,
    DESC = 1,
    ASC = 2,
}

type Extends<T, U extends T> = U;

export type ColumnKeys = "hash" | "timestamp" | "amount" | "from" | "to";
export type ColumnKeysSortable = Extends<ColumnKeys, "timestamp" | "amount">;
export type ColumnKeysFilterable = Extends<ColumnKeys, "from" | "to">;
