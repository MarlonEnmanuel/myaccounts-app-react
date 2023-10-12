import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError } from "../api";

export enum RequestMode {
    Fetch,
    Submit,
};

export type RequestHandler = (signal:AbortSignal) => Promise<void>;

export function useRequestControl (
    mode: RequestMode,
    defaultHandler?: RequestHandler,
    ejecuteOnInit:boolean = false,
){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError>();
    const abortCtrl = useRef<AbortController>();

    const request = useCallback(async (handler?:RequestHandler) => {

        const requestHandler = handler ?? defaultHandler;
        if (!requestHandler) {
            throw new Error("Should pass an handler or define defaultHandler");
        }

        if (isLoading && mode === RequestMode.Fetch) {
            abortCtrl.current?.abort();
        }
        if (isLoading && mode === RequestMode.Submit) {
            return;
        }

        setError(undefined);
        setIsLoading(true);
        abortCtrl.current = new AbortController();

        try {
            requestHandler(abortCtrl.current.signal);
        }
        catch(error:any) {
            if (abortCtrl.current.signal.aborted) {
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
            abortCtrl.current = undefined;
        }

    }, [isLoading, mode, setError, setIsLoading, defaultHandler]);

    const cancel = useCallback(() => {
        abortCtrl?.current?.abort();
    }, []);

    useEffect(() => {
        if (ejecuteOnInit) {
            request();
        }
        return () => cancel();
    }, [ejecuteOnInit, request, cancel]);

    return { isLoading, error, request, cancel };
};