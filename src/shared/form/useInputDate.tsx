import { Dayjs } from "dayjs";
import { useCallback, useState } from "react";

interface InputDateOptions {
    initialValue: Dayjs|null,
};

export const useInputDate = <T extends object,>(name:keyof T, options:Partial<InputDateOptions> = {}) => {
    
    const config:InputDateOptions = {
        initialValue: null,
        ...options,
    };

    const [value, setValue] = useState<Dayjs|null>(config.initialValue);

    const onChange = useCallback((newValue:Dayjs|null) => {
        setValue(newValue);
    }, []);
    
    return { name, value, onChange };
};