import { TextFieldProps } from "@mui/material";

export const NaturalNumberConfig:TextFieldProps = {
    type: 'number',
    inputProps: {
        inputMode: 'numeric',
        pattern: '[0-9]*',
    },
};

export const MoneyNumberConfig:TextFieldProps = {
    type: 'number',
    inputProps: {
        inputMode: 'decimal',
    },
};