import api from './axiosInstance.ts';

export const fetchExchange = async (): Promise<string[]> => {
  try {
    const response = await api.post('/contract/exchange');
    return response.data;
  } catch (error) {
    console.error('Fetching exchanges failed:', error);
    throw error;
  }
};

export const fetchInstrument = async (exchange: string | null ): Promise<string[]> => {
    try{
        const response = await api.post('/contract/instrument', {exchange});
        return response.data;
    }
    catch (error) {
        console.error('Fetching instruments failed:', error);
        throw error;
    }
};

export const fetchSymbol = async (exchange: string | null, instrument: string | null): Promise<string[]> => {
    try{
        const response = await api.post('/contract/symbol', {exchange, instrument});
        return response.data;
    }
    catch (error) {
        console.error('Fetching symbols failed:', error);
        throw error;
    }
};

export const fetchExpiryDates = async (exchange: string | null, instrument:string | null, symbol: string | null): Promise<string[]> => {
    try{
        const response = await api.post('/contract/expiry', {exchange, instrument, symbol});
        return response.data;
    }
    catch(error) {
        console.error('Fetching expiry dates failed:', error);
        throw error;
    }
};

export const fetchOptionType = async (exchange: string | null, instrument:string | null, symbol: string | null, expiry: string | null): Promise<string[]> => {
    try {
        const response = await api.post('/contract/option', {exchange, instrument, symbol, expiry});
        return response.data;
    }
    catch (error) {
        console.error('Fetching Option Type failed:', error);
        throw error;
    }
};

export const fetchStrike = async (exchange: string | null, instrument:string | null, symbol: string | null, expiry: String | null): Promise<string[]> => {
    try{
        const response = await api.post('/contract/strike', {exchange, instrument, symbol, expiry});
        return response.data;
    }
    catch (error) {
        console.error('Fetching Strike Prices failed:', error);
        throw error;
    }
};