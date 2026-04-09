export type FormValues = {
    exchange: string;
    instrument: string;
    indexOrStock: string;
    expiry: string;
    optionType: string;
    buySell: string;
    ratio: string;
    gap: string;
    strikeStart: string;
    strikeStop: string;
    step: string;
    minimumInterval: number
} & Record<string, string>;

export type TOKEN = number;
export type BUYSELL = "Buy" | "Sell"; 
export type OPTIONTYPE = "XX" | "CE" | "PE";