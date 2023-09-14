import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from "@mui/material";
import { useCallback } from "react";
import { InputOption, InputBaseProps } from "./Common";
import { getNumberErrors } from "./Errors";

export interface InputSelectProps extends InputBaseProps<number> {
    options: InputOption[],
};

export const InputSelect: React.FC<InputSelectProps> = (props) => {

    const { state } = props;
    const { setValue, setErrors } = state;

    const handleChange = useCallback((ev: SelectChangeEvent<number>) => {

        const value = parseInt(ev.target.value.toString());
        if (isNaN(value)){
            return;
        }
        
        setValue(value);

        if (setErrors) {
            var errors = getNumberErrors(value, {
                required: props.required,
            });
            setErrors(errors);
        }
    }, [setValue, setErrors, props.required]);

    const getValue = () => {
        return props.options.some(o => o.id === props.state.value)
                ? props.state.value : 0;
    };
    
    const selectProps: SelectProps<number> = {
        label: props.label,
        name: props.state.name,
        value: getValue(),
        onChange: handleChange,
    };

    return (
        <FormControl fullWidth error={!!state.errors?.length}>
            {props.label &&
                <InputLabel required={props.required}>{props.label}</InputLabel>
            }
            <Select<number> {...selectProps}>
                <MenuItem value={0} disabled>Seleccione</MenuItem>
                {props.options.map(option => 
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                )}
            </Select>
            {!!state.errors &&
                <FormHelperText>{state.errors.join(' / ')}</FormHelperText>
            }
        </FormControl>
    );
};
