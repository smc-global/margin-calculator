import React from "react";
import { useFormContext, useWatch, } from "react-hook-form";  // Import useWatch to watch form values
import { useQuery } from "@tanstack/react-query";
import { fetchExpiryDates, fetchInstrument, fetchOptionType, fetchStrike, fetchSymbol } from "../../../services/formApi";
import DropDown from "../dropdowns/Dropdown";
import { ExchangeNames } from "../../../common/enums";
interface MarginLegProps {

}

const MarginLeg: React.FC<MarginLegProps> = ({

}) => {
    const { setValue, control } = useFormContext();

    // Watch form values
    const exchange = useWatch({ control, name: `exchange` });
    const instrument = useWatch({ control, name: `instrument` });
    const symbol = useWatch({ control, name: `symbol` });
    const expiry = useWatch({ control, name: `expiry` });

    const { data: instrumentList = [] } = useQuery({
        queryKey: ['instrument', exchange],
        queryFn: () => fetchInstrument(exchange),
        enabled: !!exchange && exchange.length > 0,
    });

    const { data: symbolList = [] } = useQuery({
        queryKey: ['symbol', exchange, instrument],
        queryFn: () => fetchSymbol(exchange, instrument),
        enabled: !!exchange && !!instrument,
    });

    const { data: expiryList = [] } = useQuery({
        queryKey: ['expiry', exchange, instrument, symbol],
        queryFn: () => fetchExpiryDates(exchange, instrument, symbol),
        enabled: !!exchange && !!instrument && !!symbol,
    });

    const { data: strikePriceList = [] } = useQuery({
        queryKey: ['strike', exchange, instrument, symbol, expiry],
        queryFn: () => fetchStrike(exchange, instrument, symbol, expiry),
        enabled: !!exchange && !!instrument && !!symbol && !!expiry,
    });

    const { data: optionTypeList = [] } = useQuery({
        queryKey: ['optionType', exchange, instrument, symbol, expiry],
        queryFn: () => fetchOptionType(exchange, instrument, symbol, expiry),
        enabled: !!exchange && !!instrument && !!symbol && !!expiry,
    });

    const filteredStrikeList = strikePriceList.map(String);

    const handleSelectChange = (name: string, value: string) => {
        setValue(name, value);
        switch (name) {
            case `exchange`:
                setValue(`instrument`, null);
                setValue(`symbol`, null);
                setValue(`expiry`, null);
                setValue(`strike`, null);
                setValue(`optionType`, null);
                break;
            case `instrument`:
                setValue(`symbol`, null);
                setValue(`expiry`, null);
                setValue(`strike`, null);
                setValue(`optionType`, null);
                break;
            case `symbol`:
                setValue(`expiry`, null);
                setValue(`strike`, null);
                setValue(`optionType`, null);
                break;
            case `expiry`:
                setValue(`strike`, null);
                setValue(`optionType`, null);
                break;
            default:
                break;
        }
    };
    return (
        <div className="leg-container">
            <DropDown
                name={`exchange`}
                label="Exchange"
                datalist={
                    [ExchangeNames.NSEFO, ExchangeNames.BSEFO]?.map((e: ExchangeNames) => ({
                        label: e,
                        value: String(e),
                    })) || []
                }
                required
                disable={false}
                onChange={(name, value) => handleSelectChange(name, value)}
            />
            <DropDown
                name={`instrument`}
                label="Instrument"
                datalist={
                    instrumentList?.map((i: string) => ({
                        label: i,
                        value: i,
                    })) || []
                }
                required
                onChange={(name, value) => handleSelectChange(name, value)}
            />
            <DropDown
                name={`symbol`}
                label="Symbol"
                datalist={
                    symbolList?.map((s: string) => ({
                        label: s,
                        value: s,
                    })) || []
                }
                required
                onChange={(name, value) => handleSelectChange(name, value)}
            />
            <DropDown
                name={`expiry`}
                label="Expiry"
                datalist={
                    expiryList?.map((e: string) => ({
                        label: e,
                        value: e,
                    })) || []
                }
                required
                onChange={(name, value) => handleSelectChange(name, value)}
            />
            <DropDown
                name={`strike`}
                label="Strike"
                datalist={
                    filteredStrikeList?.map((o: string) => ({
                        label: o,
                        value: o,
                    })) || []
                }
                required
                onChange={(name, value) => handleSelectChange(name, value)}
            />
            <DropDown
                name={`optionType`}
                label="Option Type"
                datalist={
                    optionTypeList?.map((o: string) => ({
                        label: o,
                        value: o,
                    })) || []
                }
                required
                onChange={(name, value) => handleSelectChange(name, value)}
            />
            <DropDown
                name={`buySell`}
                label="Buy/Sell"
                datalist={["Buy", "Sell"].map((bs) => ({
                    label: bs,
                    value: bs,
                }))}
                required
                onChange={(name, value) => handleSelectChange(name, value)}
            />
            <DropDown
                name={`lots`}
                label="Lots"
                datalist={Array.from({ length: 10 }, (_, i) => ({
                    label: String(i + 1),
                    value: String(i + 1),
                }))}
                required
                onChange={(name, value) => handleSelectChange(name, value)}
            />
        </div>
    );
};
export default MarginLeg;