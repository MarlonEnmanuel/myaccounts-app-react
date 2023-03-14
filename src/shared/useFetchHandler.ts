import { useCallback, useEffect, useState } from "react";
import { AppErrorResult } from "../api/models/AppErrorResult";
import { FetchStatus } from "./FetchStatus";

type FetchCbType<I,O> = (params:I, signal:AbortSignal) => Promise<O>; 

const useFetchHandler = <I, O>(fetchCb:FetchCbType<I, O>) => {

    const [status, setStatus] = useState<FetchStatus>(FetchStatus.initial);
    const [error, setError] = useState<AppErrorResult|null>(null);
    const [controller] = useState<AbortController>(() => new AbortController());

    const fetch = useCallback(async (param:I) => {
        setStatus(FetchStatus.loading);
        setError(null);
        try {
            const resp = await fetchCb(param, controller.signal);
            setError(null);
            setStatus(FetchStatus.success);
            return resp;
        } catch(ex:any) {
            setError(ex as AppErrorResult);
            setStatus(FetchStatus.error);
        }
    }, []);

    const reset = useCallback(() => {
        controller.abort();
        setStatus(FetchStatus.initial);
        setError(null);
    }, []);

    useEffect(() => {
        return () => controller.abort();
    }, []);

    return {
        status,
        error,
        fetch,
        reset,
    };
};

export default useFetchHandler;