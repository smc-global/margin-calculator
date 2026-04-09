export enum StrategyNames {
    Ratio2L = 'ratio-2l',
    Calendar = 'calendar',
    Fut2Fut = 'fut2fut',
    Ratio3l = 'ratio-3l',
    Butterfly121 = 'butterfly-121',
    ConRev = 'conrev',
    Box = 'box',
    Ratio4L = 'ratio-4l',
    Butterfly1331 = 'butterfly-1331',
    optionChain = 'option-chain',
};

export enum ExchangeNames {
    NSEFO = 'NSEFO',
    NSECM = 'NSECM',
    BSEFO = 'BSEFO',
    BSECM = 'BSECM',
    MCXFO = 'MCXFO',
}

export enum ExchangeNumber {
    NSEFO = 1,
    NSECM = 2,
    BSEFO = 3,
    BSECM = 4,
    MCXFO = 5,
}

export const underlyingExchangeFromExchangeName = {
    [ExchangeNames.NSEFO]: ExchangeNames.NSECM,
    [ExchangeNames.NSECM]: ExchangeNames.NSECM,
    [ExchangeNames.BSEFO]: ExchangeNames.BSECM,
    [ExchangeNames.BSECM]: ExchangeNames.BSECM,
    [ExchangeNames.MCXFO]: ExchangeNames.MCXFO,
};

export const underlyingExchangeFromExchangeNumber = {
    [ExchangeNumber.NSEFO]: ExchangeNumber.NSECM,
    [ExchangeNumber.NSECM]: ExchangeNumber.NSECM,
    [ExchangeNumber.BSEFO]: ExchangeNumber.BSECM,
    [ExchangeNumber.BSECM]: ExchangeNumber.BSECM,
    [ExchangeNumber.MCXFO]: ExchangeNumber.MCXFO,
};

export enum OptionTypeEnum {
    FUTURE = "XX",
    CE = "CE",
    PE = "PE",
}

export enum BuySellEnum {
    BUY = "Buy",
    SELL = "Sell",
}

export const ExchangeNameFromNumber = {
    [ExchangeNumber.NSEFO]: ExchangeNames.NSEFO,
    [ExchangeNumber.NSECM]: ExchangeNames.NSECM,
    [ExchangeNumber.BSEFO]: ExchangeNames.BSEFO,
    [ExchangeNumber.BSECM]: ExchangeNames.BSECM,
    [ExchangeNumber.MCXFO]: ExchangeNames.MCXFO,

};

export const ExchangeNumberFromName = {
    [ExchangeNames.NSEFO]: ExchangeNumber.NSEFO,
    [ExchangeNames.NSECM]: ExchangeNumber.NSECM,
    [ExchangeNames.BSEFO]: ExchangeNumber.BSEFO,
    [ExchangeNames.BSECM]: ExchangeNumber.BSECM,
    [ExchangeNames.MCXFO]: ExchangeNumber.MCXFO,
};

export enum InstrumentEnum {
    FUTIDX = 'FUTIDX',
    FUTSTK = 'FUTSTK',
    OPTIDX = 'OPTIDX',
    OPTSTK = 'OPTSTK',
    EQUITY = 'EQUITY',
    FUTCOM = 'FUTCOM',
    OPTCOM = 'OPTCOM',
}

export const INDEX_CODE_TO_NAME: Record<number, string> = {
    1: "NIFTY",
    2: "BANKNIFTY",
    3: "FINNIFTY",
    4: "MIDCPNIFTY",
    5: "NIFTYNXT50",
    6: "INDIA VIX",

    11: "SENSEX",
    12: "SENSEX50",
    13: "BANKEX",

    21: 'MCXCOMPDEX',
    22: 'MCXBULLDEX',
    23: 'MCXMETLDEX',
    24: 'MCXENRGDEX',
    25: 'MCXGOLDEX',
    26: 'MCXSILVDEX',
    27: 'MCXALUMDEX',
    28: 'MCXCOPRDEX',
    29: 'MCXLEADEX',
    30: 'MCXZINCDEX',
    31: 'MCXCRUDEX',
    32: 'MCXNGASDEX',
};

export const SYMBOL_TO_INDEX_CODE: Record<string, number> = {
    "NIFTY": 1,
    "BANKNIFTY": 2,
    "FINNIFTY": 3,
    "MIDCPNIFTY": 4,
    "NIFTYNXT50": 5,
    "INDIA VIX": 6,

    'SENSEX': 11,
    'SENSEX50': 12,
    'BANKEX': 13,

    'MCXCOMPDEX': 21,
    'MCXBULLDEX': 22,
    'MCXMETLDEX': 23,
    'MCXENRGDEX': 24,
    'MCXGOLDEX': 25,
    'MCXSILVDEX': 26,
    'MCXALUMDEX': 27,
    'MCXCOPRDEX': 28,
    'MCXLEADEX': 29,
    'MCXZINCDEX': 30,
    'MCXCRUDEX': 31,
    'MCXNGASDEX': 32,
};

export enum DashBoardOptions {
    DASHBOARD = '/dashboard',
    SPREADSHEETS = '/dashboard/spreadsheets',
    OPTION_CHAIN = '/dashboard/option-chain',
    SPREADSHEET_FORMS = "/dashboard/spreadsheets/forms",
    SPREADSHEET_TABLES = "/dashboard/spreadsheets/tables",
    MARGIN_CALCULATOR = "/dashboard/margin-calculator",
    ROCKET_CHAT = "/rocket-chat",
}