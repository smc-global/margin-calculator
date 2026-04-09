import api from "./axiosInstance";

export const getMarginFromBackend = async (portfolio: any[]) => {
  try {
    const response = await api.post('/grid/get-margin', { portfolio });
    return response;
  }
  catch (error) {
    console.error('Saving Grid Column Config failed.', error);
    throw error;
  }
}