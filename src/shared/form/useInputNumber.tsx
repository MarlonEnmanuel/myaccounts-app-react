import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";

interface InputNumberOptions {
    initialValue: number,
    isDecimal: boolean,
};

export const useInputNumber = <T extends object,>(name:keyof T, options:Partial<InputNumberOptions> = {}) => {

    const config:InputNumberOptions = {
        initialValue: 0,
        isDecimal: false,
        ...options,
    };

    const [value, setValue] = useState<number>(config.initialValue);

    const onChange = useCallback((ev: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>|SelectChangeEvent<number>) => {
        const stringVal = ev.target.value.toString();
        let numericValue = config.isDecimal ? parseFloat(stringVal) : parseInt(stringVal);
        if (isNaN(numericValue)) numericValue = 0;
        setValue(numericValue);
    }, [config.isDecimal]);

    return { name, value, onChange };
}