import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, RadioGroupProps } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { InputOption, InputBaseProps } from "./Common";
import { getNumberErrors } from "./Errors";

export interface InputRadioProps extends InputBaseProps<number> {
    options: InputOption[],
};

export const InputRadio: React.FC<InputRadioProps> = (props) => {

    const { state } = props;
    const { setValue, setErrors } = state;

    const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {

        var value = parseInt(ev.target.value.toString());
        if (isNaN(value)) {
            return;
        }

        setValue(value);

        if (setErrors) {
            const errors = getNumberErrors(value, {
                required: props.required,
            })
            setErrors(errors);
        }        
    }, [setValue, setErrors, props.required]);
    
    const radioProps: RadioGroupProps = {
        name: props.state.name,
        value: props.state.value,
        onChange: handleChange,
    };

    return (
        <FormControl fullWidth error={!!state.errors} required={props.required}>
            {props.label &&
                <FormLabel>{props.label}</FormLabel>
            }
            <RadioGroup row {...radioProps}>
                {props.options.map(option => 
                    <FormControlLabel key={option.id} value={option.id} label={option.name} control={<Radio />} />
                )}
            </RadioGroup>
            {!!state.errors &&
                <FormHelperText>{state.errors.join(' / ')}</FormHelperText>
            }
        </FormControl>
    );
};
