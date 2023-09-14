import { ValidateNumberOptions, ValidateTextNumberOptions, ValidateTextOptions } from "./Common";

export const Errors = {
    Required: 'Obligatorio',
    InvalidNumber: 'Número no válido',
    InvalidOption: 'Opción no válida',
    MinLength: (min:number) => `Mínimo ${min} carateres(s)`,
    MaxLength: (max:number) => `Máximo ${max} carateres(s)`,
    MinNumber: (min:number) => `Debe ser al menos ${min}`,
    MaxNumber: (max:number) => `Debe ser como máximo ${max}`,
};

export const getNumberErrors = (value:number, options:ValidateNumberOptions) => {
    let errors: string[] = [];

    if (isNaN(value) || value === null || value === undefined) {
        errors.push(Errors.InvalidOption);
    } else {
        if (options.required && value === 0) {
            errors.push(Errors.Required);
        }
    }
    return errors;
};

export const getTextErrors = (value:string, options:ValidateTextOptions) => {
    let errors: string[] = [];

    if (options.required && value.length === 0){
        errors.push(Errors.Required);
    } else {
        if (options.minLength && value.length < options.minLength){
            errors.push(Errors.MinLength(options.minLength));
        }
        if (options.maxLength && value.length > options.maxLength){
            errors.push(Errors.MaxLength(options.maxLength));
        }
    }
    return errors;
};

export const getTextNumberErrors = (value:number, options:ValidateTextNumberOptions) => {
    let errors: string[] = [];

    if (isNaN(value) || value === null || value === undefined) {
        errors.push(Errors.InvalidNumber);
    } else {
        if (options.required && value === 0) {
            errors.push(Errors.Required);
        } else {
            if (options.min && value < options.min){
                errors.push(Errors.MinNumber(options.min));
            }
            if (options.max && value > options.max){
                errors.push(Errors.MaxNumber(options.max));
            }
        }
    }
    return errors;
};