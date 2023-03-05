/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly REACT_APP_URL: string;
        readonly REACT_APP_MYACCOUNTS_API_URL: string;
        readonly REACT_APP_MYACCOUNTS_API_TIMEOUT: number;
    }
}