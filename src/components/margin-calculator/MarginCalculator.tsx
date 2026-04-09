import { Button, Card, CardContent, Divider, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MarginLeg from "../legs/MarginLeg";
import { errorToast, formatValueToIndianNumberFormat, sleep, successToast } from "../../../common/functions";
import { getMarginFromBackend } from "../../../services/tableService";
import SyncIcon from "@mui/icons-material/Sync";

const getExchangeGroup = (exchange: string) => {
    if (exchange.startsWith('NSE')) return 'NSE';
    if (exchange.startsWith('BSE')) return 'BSE';
    return null;
};

const isDuplicateLeg = (rows: any[], newLeg: any) =>
    rows.some(
        (leg) =>
            leg.exchange === newLeg.exchange &&
            leg.instrument === newLeg.instrument &&
            leg.symbol === newLeg.symbol &&
            leg.expiry === newLeg.expiry &&
            leg.strike === newLeg.strike &&
            leg.optionType === newLeg.optionType
    );

export default function MarginCalculator() {
    const methods = useForm<any>();
    const { handleSubmit } = methods;
    const [rowData, setRowData] = useState<any[]>([]);
    const [lastCalculatedRowData, setLastCalculatedRowData] = useState<any[]>([]);
    const theme = useTheme();

    const [marginDetail, setMarginDetail] = useState<any | null>(null);

    const [loadingMargin, setLoadingMargin] = useState(false);

    const isExchangeCompatible = (rows: any[], newLeg: any) => {
        if (!rows.length) return true; // first leg always allowed

        const existingGroup = getExchangeGroup(rows[0].exchange);
        const newGroup = getExchangeGroup(newLeg.exchange);
        return existingGroup === newGroup;
    };

    const onSubmit = async (data: any) => {
        if (!isExchangeCompatible(rowData, data)) {
            errorToast(
                'Mixed exchanges not allowed. NSE and BSE contracts cannot be combined.'
            );
            return;
        }

        if (isDuplicateLeg(rowData, data)) {
            errorToast('This leg already exists. Buy/Sell on same strike is not allowed.');
            return;
        }

        const updatedRowData = [...rowData, data];
        setRowData(updatedRowData);
        successToast(`Added Leg to your Porfolio`);
    };

    const deleteLeg = (index: number) => {
        const updatedRowData = rowData.filter((_, i) => i !== index);
        setRowData(updatedRowData);
    };

    const updateEditableLots = (index: number, delta: number) => {
        setRowData((prev) =>
            prev.map((leg, i) =>
                i === index
                    ? { ...leg, lots: Math.max(1, Number(leg.lots) + delta) }
                    : leg
            )
        );
    };

    const toggleBuySell = (index: number) => {
        setRowData((prev) =>
            prev.map((leg, i) =>
                i === index
                    ? { ...leg, buySell: leg.buySell === 'Buy' ? 'Sell' : 'Buy' }
                    : leg
            )
        );
    };

    const resetRowData = () => {
        setRowData([]);
        setLastCalculatedRowData([]);
        setMarginDetail(null);
    };

    const applyLotChanges = async () => {
        if (!rowData.length) {
            errorToast('Add at least one leg');
            return;
        }

        const toastId = toast.loading('Recalculating margin...');
        setLoadingMargin(true);

        try {
            const response = await getMarginFromBackend(rowData);
            await sleep(300);

            toast.dismiss(toastId);

            if (response.status === 201) {
                if (response.data) {
                    let margin = response.data.margin;
                    let nextDayMargin = response.data.nextDayMargin;
                    if (response.data.premium < 0) {
                        margin += response.data.premium;
                        nextDayMargin += response.data.premium;
                    }
                    nextDayMargin = Math.max(0, nextDayMargin);
                    const calculatedMarginDetail = {
                        initialSpanRisk: response.data.initialSpan,
                        netOptionPremium: response.data.premium,
                        totalSpanRequirement: response.data.totalSpan,
                        optionExposure: response.data.optionExposure,
                        futureExposure: response.data.futureExposure,
                        margin: margin,
                        totalFund: response.data.margin,
                        totalMargin: nextDayMargin,
                    }
                    setMarginDetail(calculatedMarginDetail);
                }
                setLastCalculatedRowData(JSON.parse(JSON.stringify(rowData)));

                successToast('Margin calculated');
            } else {
                // console.log('response:', response.data);
                errorToast('Failed to calculate margin');
            }
        } catch (err) {
            toast.dismiss(toastId);
            errorToast('Error while calculating margin');
            console.error(err);
        } finally {
            setLoadingMargin(false);
        }
    };

    return (
        <Stack
            spacing={4}
            sx={{
                maxWidth: 1200,
                margin: "auto",
                px: 2,
                py: 4
            }}
        >
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Leg Input */}
                    <Card sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 3
                    }}>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: "center", justifyContent: "center" }}
                        >
                            <MarginLeg />
                            <button type="submit" className="green-button" style={{ margin: ' 2.1rem 1rem 1rem' }}>
                                Add Leg
                            </button>
                        </Stack>
                    </Card>

                    <div className='margin-end-panel'>
                        <button
                            className="primary-button"
                            onClick={applyLotChanges}
                            disabled={!rowData.length || loadingMargin || JSON.stringify(rowData) == JSON.stringify(lastCalculatedRowData)}
                        >
                            {loadingMargin ? 'Calculating...' : 'Calculate Margin'}
                        </button>

                        <button
                            className={theme.palette.mode === 'light' ? 'secondary-button-light' : 'secondary-button-dark'}
                            onClick={resetRowData}
                            disabled={!rowData.length}
                        >
                            Reset Table
                        </button>
                    </div>

                </form>
            </FormProvider>
            {/* Portfolio + Margin */}
            <div className="margin-detail">
                <Card sx={{
                    flex: 5,
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3
                }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Your Portfolio
                        </Typography>

                        <Divider sx={{ mb: 1 }} />

                        {!rowData.length ? (
                            <Typography color="text.secondary">
                                No legs added
                            </Typography>
                        ) : (
                            <div style={{ overflow: 'auto', textAlign: 'center' }}>
                                <table className="margin-table">
                                    <thead>
                                        <tr>
                                            <th>Instrument</th>
                                            <th>Symbol</th>
                                            <th>Expiry</th>
                                            <th>Strike</th>
                                            <th>Option Type</th>
                                            <th>Side</th>
                                            <th>Lots</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowData.map((leg, index) => (
                                            <tr key={index}>
                                                <td>{leg.instrument}</td>
                                                <td>{leg.symbol}</td>
                                                <td>{leg.expiry}</td>
                                                <td>{leg.strike}</td>
                                                <td>{leg.optionType}</td>

                                                <td >
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        disableElevation
                                                        sx={{
                                                            minWidth: '4.5rem',
                                                            textTransform: 'none',
                                                        }}
                                                        color={leg.buySell === 'Sell' ? 'error' : 'success'}
                                                        onClick={() => toggleBuySell(index)}
                                                        endIcon={
                                                            <SyncIcon
                                                                sx={{
                                                                    transition: 'transform 0.3s ease',
                                                                    transform: leg.buySell === 'Sell'
                                                                        ? 'rotate(180deg)'
                                                                        : 'rotate(0deg)',
                                                                }}
                                                            />
                                                        }
                                                    >
                                                        {leg.buySell}
                                                    </Button>
                                                </td>

                                                <td>
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                        <button onClick={() => updateEditableLots(index, -1)}>-</button>
                                                        <span style={{ margin: '0 8px' }}>{leg.lots}</span>
                                                        <button onClick={() => updateEditableLots(index, 1)}>+</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button onClick={() => deleteLeg(index)} style={{ color: 'red' }}>
                                                        ✕
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card sx={{
                    flex: 3,
                    minWidth: 300,
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3

                }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Margin Summary
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        {!marginDetail ? (
                            <Typography color="text.secondary">
                                Calculate margin to see details
                            </Typography>
                        ) : (
                            <Stack spacing={1} >
                                <Typography>Initial SPAN Risk: <b>{formatValueToIndianNumberFormat(marginDetail.initialSpanRisk)}</b></Typography>
                                <Typography
                                    color={(marginDetail && marginDetail.netOptionPremium < 0) ? 'error' : 'success.main'}
                                >
                                    Net Option Premium: <b>{formatValueToIndianNumberFormat(marginDetail.netOptionPremium)}</b>
                                </Typography>
                                <Typography>Total SPAN Requirement: <b>{formatValueToIndianNumberFormat(marginDetail.totalSpanRequirement)}</b></Typography>
                                <Typography>
                                    Option Exposure: <b>{formatValueToIndianNumberFormat(marginDetail.optionExposure)}</b>
                                </Typography>
                                <Typography>
                                    Future Exposure: <b>{formatValueToIndianNumberFormat(marginDetail.futureExposure)}</b>
                                </Typography>

                                <Tooltip title='The Margin that will be locked by the exchange'
                                    slotProps={{
                                        tooltip: {
                                            sx: {
                                                margin: '0 !important',
                                            },
                                        },
                                    }}
                                >
                                    <Typography>Margin: <b>{formatValueToIndianNumberFormat(marginDetail.margin)}</b></Typography>
                                </Tooltip>

                                <Tooltip title="The total fund that will be utilised, ie, Margin + premium"
                                    placement="bottom-end"
                                    slotProps={{
                                        tooltip: {
                                            sx: {
                                                margin: '0 !important',
                                            },
                                        },
                                    }}
                                >
                                    <Typography>Total Fund: <b>{formatValueToIndianNumberFormat(marginDetail.totalFund)}</b></Typography>
                                </Tooltip>

                                <Divider sx={{ mb: 2 }} />
                                <Tooltip title="The Margin on T+1, ie, Margin when premium benefit is received."
                                    placement="bottom-end"
                                    slotProps={{
                                        tooltip: {
                                            sx: {
                                                margin: '0 !important',
                                            },
                                        },
                                    }}
                                >
                                    <Typography
                                    >
                                        Margin ( T+1 ): <b>{formatValueToIndianNumberFormat(marginDetail.totalMargin)}</b>
                                    </Typography>
                                </Tooltip>

                            </Stack>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Card sx={{ mt: 4, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    How Margin is Calculated
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Margin in F&O trading is calculated using SPAN (Standard Portfolio Analysis of Risk)
                    and Exposure margin. This tool helps traders estimate required capital before placing trades.
                </Typography>
            </Card>
        </Stack>
    )
}