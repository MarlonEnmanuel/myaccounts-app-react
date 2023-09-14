import { TextField, TextFieldProps } from "@mui/material";
import { InputBaseProps, ValidateTextOptions } from "./Common";
import { useCallback } from "react";
import { getTextErrors } from "./Errors";

export interface InputTextProps extends InputBaseProps<string>,
                                        ValidateTextOptions {};

export const InputText: React.FC<InputTextProps> = (props) => {
    
    const { state } = props;
    const { setValue, setErrors } = state;

    const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value;
        setValue(value);

        if (setErrors) {
            const errors = getTextErrors(value, {
                required: props.required,
                minLength: props.minLength,
                maxLength: props.maxLength,
            });
            setErrors(errors);
        }
    }, [setValue, setErrors, props.required, props.minLength, props.maxLength]);

    const inputProps: TextFieldProps = {
        fullWidth: true,
        label: props.label,
        required: props.required,
        name: props.state.name,
        defaultValue: props.state.value,
        onChange: handleChange,
        error: !!state.errors?.length,
        helperText: state.errors?.join(' / '),
    };

    return (
        <TextField {...inputProps} />
    );
};