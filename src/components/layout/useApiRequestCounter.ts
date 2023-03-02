import { useEffect, useState } from "react";
import client from "../../api/client";

export const useApiRequestCounter = () => {

    const [requestCount, setRequestCount] = useState<number>(0);
    
    useEffect(() => {

        const reqId = client.interceptors.request.use(config => {
            setRequestCount(count => count + 1);
            return config;
        }, error => {
            setRequestCount(count => count - 1);
            Promise.reject(error);
        });

        const resId = client.interceptors.response.use(response => {
            setRequestCount(count => count - 1);
            return response;
        }, error => {
            setRequestCount(count => count - 1);
            Promise.reject(error);
        });

        return () => {
            client.interceptors.request.eject(reqId);
            client.interceptors.response.eject(resId);
        };
    }, []);

    return requestCount;
};