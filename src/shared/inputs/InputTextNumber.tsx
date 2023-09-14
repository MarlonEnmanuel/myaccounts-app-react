import { TextField, TextFieldProps } from "@mui/material";
import { useCallback } from "react";
import { InputBaseProps, ValidateTextNumberOptions } from "./Common";
import { getTextNumberErrors } from "./Errors";

export interface InputNumberProps extends InputBaseProps<number>, ValidateTextNumberOptions {
    isDecimal?: boolean,
    pattern?: string,
};

export const InputTextNumber: React.FC<InputNumberProps> = (props) => {
    
    const { state } = props;
    const { setValue, setErrors } = state;

    const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        
        var strval = ev.target.value.trim().toString() || '0';
        var numval = props.isDecimal ? parseFloat(strval) : parseInt(strval);

        if (!isNaN(numval)) {
            setValue(numval);
        }

        if (setErrors) {
            const errors = getTextNumberErrors(numval, {
                required: props.required,
                min: props.min,
                max: props.max,
            });
            setErrors(errors);
        }
    }, [setValue, setErrors, props.isDecimal, props.required, props.min, props.max]);

    const inputProps: TextFieldProps = {
        fullWidth: true,
        label: props.label,
        required: props.required,
        name: props.state.name,
        defaultValue: props.state.value,
        onChange: handleChange,
        inputProps: {
            inputMode: props.isDecimal ? 'decimal' : 'numeric',
            pattern: props.pattern,
        },
        error: !!state.errors?.length,
        helperText: state.errors?.join(' / '),
    };

    return (
        <TextField {...inputProps} />
    );
};
