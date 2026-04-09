import { ExchangeNames, ExchangeNumber } from "./enums.ts";

export interface DecodedToken {
    id: number;
    username: string;
    iat: number;
    exp: number;
}

export type DataListType = {
    label: string;
    value: string | number;
};

export type DropDownProps = {
    name: string;
    label: string;
    required?: boolean;
    datalist: DataListType[];
    disable?: boolean;
    disableValue?: string;
    onChange?: (name: string, value: string) => void;
};

export interface DropDownMultiProps {
    name: string;
    label: string;
    required?: boolean;
    datalist: string[];
    locked?: boolean;
    lockedValue?: string | null;
    onChange?: (name: string, value: string[]) => void;
}
export interface DropDownInputProps {
    name: string;
    label: string;
    required?: boolean;
    locked?: boolean;
    lockedValue?: string | null;
    min?: number;
    max?: number;
    allowMultiple: boolean;
    allowZero?: boolean;
    onChange: (name: string, value: string) => void;
}

export interface FutureSpotTokenData {
    symbol: string;
    token: number;
    lot_size: number;
}
export interface FutureSpotTokens {
    exchange: ExchangeNames;
    future_tokens: FutureSpotTokenData[];
    spot_tokens: FutureSpotTokenData[];
}

export interface MarginTableData {
    combined_tracker_id: bigint;
    buy_margin: number;
    buy_next_margin: number;
    buy_interest: number;
    sell_margin: number;
    sell_next_margin: number;
    sell_interest: number;
}

export interface RowData {
    row_id: number;
    table_id: number;
    strike: number;
    gap: string;
    token_arr: number[];
    combined_tracker_id: bigint
}
export interface TableToRowMap {
    table_id: number;
    table_name: string;
    usid: number;
    exchange_arr: ExchangeNames[];
    instrument_arr: string[];
    symbol_arr: string[];
    option_type_arr: string[];
    expiry_arr: Date[]
    buy_sell_arr: string[];
    ratio_arr: number[];
    futureSpotTokens: FutureSpotTokens;
    rowData: RowData[];
    gridConfiguration: any;
}
export interface StrategyTableData {
    tableData: TableToRowMap;
    marketData: Record<ExchangeNumber, Record<number, Float64Array>>;
    marginData: Record<string, number[]>;
    indexData: Record<number, Float64Array>;
    greeksData: Record<ExchangeNumber, Record<number, any>>,
};

export interface OptionChainRow {
    strike: number;
    call: number;
    put: number;
}
export interface OptionChainData {
    exchange: string,
    optionChain: OptionChainRow[],
    futureSpotTokens: any,
    gridConfiguration: any;
    marketData: Record<ExchangeNumber, Record<number, any>>,
    oiData: Record<ExchangeNumber, Record<number, any>>,
    greeksData: Record<ExchangeNumber, Record<number, any>>,
    indexData: Record<number, any>,
    bhavcopy: Record<ExchangeNumber, Record<number, Float64Array>>,
}