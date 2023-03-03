import { useEffect } from "react";

type EffectCallbackAsync = (signal:AbortSignal) => void | (() => void);
type DependencyList = ReadonlyArray<unknown>;

export const useSignalEffect = (callback:EffectCallbackAsync, deps?:DependencyList) => {

    useEffect(() => {

        const abortCtrl = new AbortController()
        var innerDestructor = callback(abortCtrl.signal);

        return () => {
            abortCtrl.abort();
            typeof innerDestructor === "function" && innerDestructor();
        };

        // eslint-disable-next-line
    }, deps);
};