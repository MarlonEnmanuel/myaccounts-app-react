import { useState } from "react";
import { FormErrors, InputState, InputType, ValueGetter, ValueOrGetter, ValueUpdater } from "./Common";

export interface FormState<TDto> {
    inputs: TDto,
    setInputs: ValueUpdater<TDto>,
    errors: FormErrors,
    setErrors: ValueUpdater<FormErrors>,
    prefix?: string,
};

export function useForm<TDto> (initialInputs: TDto) {
    
    const [ inputs, setInputs ] = useState<TDto>(initialInputs);
    const [ errors, setErrors ] = useState<FormErrors>({});

    const formState: FormState<TDto> = {
        inputs,
        setInputs,
        errors,
        setErrors,
    };

    const inputHandler = getInputStateHandler(formState);

    const isValid = () => {
        return Object.values(formState.errors).some(e => Boolean(e));
    };

    return { ...formState, isValid, inputHandler };
};

export function getInputStateHandler<TDto> (state: FormState<TDto>) {

    const { inputs, setInputs, errors, setErrors, prefix } = state;

    const getInputName = (inputProp:keyof TDto) => {
        return (prefix ?? '') + (inputProp as string);
    };

    const getValueSetter = <TValue>(inputProp:keyof TDto) => {
        return (valueOrGetter:ValueOrGetter<TValue>) => {
            setInputs(oldInputs => {
                const oldval = oldInputs[inputProp] as TValue;
                const newval = resolveValueOrGetter(valueOrGetter, oldval);
                return {...oldInputs, [inputProp]: newval};
            });
        };
    };

    const getErrorSetter = (inputName:string) => {
        return (errors:string[]) => {
            setErrors(oldErrors => {
                return {...oldErrors, [inputName]: errors};
            });
        };
    };

    const getInputState = <TValue>(inputProp:keyof TDto):InputState<TValue> => {
        const inputName = getInputName(inputProp);
        return {
            name: inputName,
            value: inputs[inputProp] as TValue,
            setValue: getValueSetter<TValue>(inputProp),
            errors: errors[inputName],
            setErrors: getErrorSetter(inputName),
        };
    };

    const validateType = (inputProp:keyof TDto, value:any, type:InputType) => {
        if (type === 'number' && typeof value === 'number') return;
        if (type === 'string' && typeof value === 'string') return;
        if (type === 'boolean' && typeof value === 'boolean') return;
        if (type === 'array' && Array.isArray(value)) return;
        throw new Error(`The value of ${getInputName(inputProp)} is not a ${type}`);
    };

    const getNumber = (inputProp:keyof TDto) => {
        const state = getInputState<number>(inputProp);
        validateType(inputProp, state.value, 'number');
        return state;
    };

    const getString = (inputProp:keyof TDto) => {
        const state = getInputState<string>(inputProp);
        validateType(inputProp, state.value, 'string');
        return state;
    };

    const getBoolean = (inputProp:keyof TDto) => {
        const state = getInputState<number>(inputProp);
        validateType(inputProp, state.value, 'boolean');
        return state;
    };

    const getArray = <TValue>(inputProp:keyof TDto) => {
        const state = getInputState<TValue[]>(inputProp);
        validateType(inputProp, state.value, 'array');
        return state;
    };

    const getArrayHandler = <TValue>(inputProp:keyof TDto) => {
        const state = getArray<TValue>(inputProp);

        return state.value.map((element, index) => {
            const prefix = `${state.name}[${index}]`;
            const formState:FormState<TValue> = {
                inputs: element,
                setInputs: (valueOrGetter:ValueOrGetter<TValue>) => {
                    state.setValue(oldArray => {
                        var oldval = oldArray[index];
                        var newval = resolveValueOrGetter(valueOrGetter, oldval);
                        return oldArray.map((val, i) => i === index ? newval : val);
                    });
                },
                errors: errors,
                setErrors: setErrors,
                prefix: prefix,
            };
            return getInputStateHandler(formState);
        });
    };

    return { getNumber, getString, getBoolean, getArray, getArrayHandler };
};

function resolveValueOrGetter<T> (valueOrGetter:ValueOrGetter<T>, oldvalue: T) {
    if (typeof valueOrGetter === 'function') {
        return (valueOrGetter as ValueGetter<T>)(oldvalue);
    } else {
        return (valueOrGetter as T);
    }
};