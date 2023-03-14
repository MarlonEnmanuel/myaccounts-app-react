import { ChangeEvent, useCallback, useState } from "react";

interface InputStringOptions {
    initialValue: string,
    isNumeric: boolean,
};

export const useInputString = <T extends object,>(name:keyof T, options:Partial<InputStringOptions> = {}) => {
    
    const config:InputStringOptions = {
        initialValue: "",
        isNumeric: false,
    };

    const [value, setValue] = useState<string>(config.initialValue);

    const onChange = useCallback((ev: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setValue(ev.target.value);
    }, []);
    
    return { name, value, onChange };
};