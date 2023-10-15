import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../api";

export type RequestHandler = (signal:AbortSignal) => Promise<void>;

export function useRequestControl (){

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError>();
    const [abortCtrl, setAbortCtrl] = useState<AbortController>();

    const request = useCallback(async (requestHandler:RequestHandler) => {
        
        const newAbortCtrl = new AbortController();
        setError(undefined);
        setIsLoading(true);
        setAbortCtrl(newAbortCtrl);

        try {
            await requestHandler(newAbortCtrl.signal);
        }
        catch(error:any) {
            if (newAbortCtrl.signal.aborted) {
                return;
            }
            if (error.response) {
                setError(error.response.data as ApiError);
            } else if (error.request) {
                setError({ title: 'Ocurrió un error de conexión, intente nuevamente en unos minutos' });
            } else {
                setError({ title: 'Ocurrió un error inesperado, intente recargar la página' });
                console.log('Error', error);
            }
        }
        finally {
            setIsLoading(false);
            setAbortCtrl(undefined);
        }

    }, [setError, setIsLoading, setAbortCtrl]);

    const cancel = useCallback(() => {
        abortCtrl?.abort();
    }, [abortCtrl]);

    useEffect(() => {
        return () => cancel();
    }, [cancel]);

    return { isLoading, error, request, cancel };
};