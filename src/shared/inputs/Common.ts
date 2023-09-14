
export type ValueGetter<T> = (oldvalue:T) => T;

export type ValueOrGetter<T> = T | ValueGetter<T>;

export type ValueUpdater<T> = (value:ValueOrGetter<T>) => void;

export interface InputState<TValue> {
    name: string,
    value: TValue,
    setValue: ValueUpdater<TValue>,
    errors?: string[],
    setErrors?: (errors:string[]) => void,
};

export interface InputBaseProps<TValue> {
    state: InputState<TValue>,
    label?: string,
    required?: boolean,
};

export type InputOption = {
    id:number,
    name:string
};

export interface ValidateNumberOptions {
    required?: boolean,
};

export interface ValidateTextOptions {
    required?: boolean,
    minLength?: number,
    maxLength?: number,
};

export interface ValidateTextNumberOptions {
    required?: boolean,
    min?: number,
    max?: number,
};

export interface FormErrors {
    [key: string] : string[],
};

export type InputType = 'number' | 'string' | 'boolean' | 'array';

export const Patterns = {
    Integer: /^-?\d+$/,
    Money: /^\d*\.?\d+$/,
};