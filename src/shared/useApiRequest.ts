import { useState, useCallback, useEffect } from 'react';
import { ApiRequest, ApiError } from '../api';

function useApiRequest<TInput, TResponse>(
    apiRequest: ApiRequest<TInput, TResponse>,
    throwError?: boolean,
){
    const [response, setResponse] = useState<TResponse>();
    const [error, setError] = useState<ApiError>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [abortController, setAbortController] = useState<AbortController>();
    
    const request = useCallback(async (input: TInput) => {
        const newAbortController = new AbortController();
        setResponse(undefined);
        setError(undefined);
        setIsLoading(true);
        setAbortController(newAbortController);
        try {
            const response = await apiRequest(input, newAbortController.signal);
            setResponse(response);
            setIsLoading(false);
            setAbortController(undefined);
        } catch (error:any) {
            if (newAbortController.signal.aborted) {
                return;
            }
            setError(error.response.data as ApiError);
            setIsLoading(false);
            setAbortController(undefined);
            if (throwError) {
                throw error;
            }
        }
    }, []);

    const cancel = useCallback(() => {
        if (abortController) abortController.abort();
    }, [abortController]);

    const reset = useCallback(() => {
        setResponse(undefined);
        setError(undefined);
        setIsLoading(false);
        setAbortController(undefined);
    }, [setResponse, setError, setIsLoading, setAbortController]);

    useEffect(() => {
        return () => cancel();
    }, [cancel]);

    return { response, error, isLoading, request, cancel, reset };
};

export function useApiFetch<TInput, TResponse>(
    apiRequest: ApiRequest<TInput, TResponse>,
    initialInputs?: TInput,
    throwError?: boolean,
){
    const {
        response,
        error,
        isLoading,
        request,
        cancel,
        reset
    } = useApiRequest(apiRequest, throwError);

    useEffect(() => {
        if (initialInputs === undefined) return;
        request(initialInputs);
    }, []);

    return { data: response, error, isLoading, fetch: request, cancel, reset };
};

export function useApiSubmit<TInput, TResponse>(
    apiRequest: ApiRequest<TInput, TResponse>,
    throwError?: boolean,
){
    const {
        response,
        error,
        isLoading,
        request,
        cancel,
        reset
    } = useApiRequest(apiRequest, throwError);

    const submit = useCallback(async (input:TInput) => {
        if (isLoading) return;
        await request(input);
    }, [isLoading, request]);

    return { result: response, error, isLoading, submit, cancel, reset };
};