import { useEffect, useState } from "react";

const useAbortController = () => {

    const [abortCrl] = useState<AbortController>(() => new AbortController());

    useEffect(() => {
        return () => {
            abortCrl.abort();
        }
    }, []);

    return abortCrl;
};

export default useAbortController;