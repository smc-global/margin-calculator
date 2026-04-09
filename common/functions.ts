import toast from "react-hot-toast";

export function getJwtTokenFromStorage() {
    const jwtToken = sessionStorage.getItem("jwtToken") || localStorage.getItem("jwtToken");
    return jwtToken;
}
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatValueToIndianNumberFormat = (value: any, fractionDigits: boolean = false) => {
    const num = Number(value);
    if (isNaN(num)) return 'NA';

    return num.toLocaleString('en-IN', fractionDigits ? {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    } : undefined);
};

export const getNumber = (
    data: Float64Array | undefined,
    index: number,
    scale = 1
): number | null => {
    if (!data) return null;
    const v = data[index];
    if (v === undefined || v === null || Number.isNaN(v)) return null;
    return v / scale;
};

export const getFixed = (
    data: Float64Array | undefined,
    index: number,
    decimals: number,
    scale = 1
): string => {
    const v = getNumber(data, index, scale);
    return v === null ? 'waiting' : v.toFixed(decimals);
};

export const percentChange = (
    current: number | null,
    previous: number | null
): string => {
    if (
        current === null ||
        previous === null ||
        previous === 0
    ) {
        return 'NA';
    }
    return (((current - previous) / previous) * 100).toFixed(2) + '%';
};

export const errorToast = (message: string) =>
    toast.error(message, { duration: 4000, position: 'bottom-center' });

export const successToast = (message: string) =>
    toast.success(message, { duration: 3000, position: 'top-center' });


export function parseDDMMYYYY(dateStr: string): Date {
    const [dd, mm, yyyy] = dateStr.split('-').map(Number);
    return new Date(Date.UTC(yyyy, mm - 1, dd, 10, 0, 0, 0));
}
